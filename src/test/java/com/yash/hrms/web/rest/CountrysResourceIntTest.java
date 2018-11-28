package com.yash.hrms.web.rest;

import com.yash.hrms.PreonboardinApp;

import com.yash.hrms.domain.Countrys;
import com.yash.hrms.repository.CountrysRepository;
import com.yash.hrms.service.CountrysService;
import com.yash.hrms.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.yash.hrms.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CountrysResource REST controller.
 *
 * @see CountrysResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PreonboardinApp.class)
public class CountrysResourceIntTest {

    private static final String DEFAULT_COUNTRY_NAME = "AAAAAAAAAA";
    private static final String UPDATED_COUNTRY_NAME = "BBBBBBBBBB";

    @Autowired
    private CountrysRepository countrysRepository;

    @Autowired
    private CountrysService countrysService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCountrysMockMvc;

    private Countrys countrys;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CountrysResource countrysResource = new CountrysResource(countrysService);
        this.restCountrysMockMvc = MockMvcBuilders.standaloneSetup(countrysResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Countrys createEntity(EntityManager em) {
        Countrys countrys = new Countrys()
            .countryName(DEFAULT_COUNTRY_NAME);
        return countrys;
    }

    @Before
    public void initTest() {
        countrys = createEntity(em);
    }

    @Test
    @Transactional
    public void createCountrys() throws Exception {
        int databaseSizeBeforeCreate = countrysRepository.findAll().size();

        // Create the Countrys
        restCountrysMockMvc.perform(post("/api/countrys")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(countrys)))
            .andExpect(status().isCreated());

        // Validate the Countrys in the database
        List<Countrys> countrysList = countrysRepository.findAll();
        assertThat(countrysList).hasSize(databaseSizeBeforeCreate + 1);
        Countrys testCountrys = countrysList.get(countrysList.size() - 1);
        assertThat(testCountrys.getCountryName()).isEqualTo(DEFAULT_COUNTRY_NAME);
    }

    @Test
    @Transactional
    public void createCountrysWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = countrysRepository.findAll().size();

        // Create the Countrys with an existing ID
        countrys.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCountrysMockMvc.perform(post("/api/countrys")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(countrys)))
            .andExpect(status().isBadRequest());

        // Validate the Countrys in the database
        List<Countrys> countrysList = countrysRepository.findAll();
        assertThat(countrysList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCountrys() throws Exception {
        // Initialize the database
        countrysRepository.saveAndFlush(countrys);

        // Get all the countrysList
        restCountrysMockMvc.perform(get("/api/countrys?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(countrys.getId().intValue())))
            .andExpect(jsonPath("$.[*].countryName").value(hasItem(DEFAULT_COUNTRY_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getCountrys() throws Exception {
        // Initialize the database
        countrysRepository.saveAndFlush(countrys);

        // Get the countrys
        restCountrysMockMvc.perform(get("/api/countrys/{id}", countrys.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(countrys.getId().intValue()))
            .andExpect(jsonPath("$.countryName").value(DEFAULT_COUNTRY_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCountrys() throws Exception {
        // Get the countrys
        restCountrysMockMvc.perform(get("/api/countrys/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCountrys() throws Exception {
        // Initialize the database
        countrysService.save(countrys);

        int databaseSizeBeforeUpdate = countrysRepository.findAll().size();

        // Update the countrys
        Countrys updatedCountrys = countrysRepository.findById(countrys.getId()).get();
        // Disconnect from session so that the updates on updatedCountrys are not directly saved in db
        em.detach(updatedCountrys);
        updatedCountrys
            .countryName(UPDATED_COUNTRY_NAME);

        restCountrysMockMvc.perform(put("/api/countrys")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCountrys)))
            .andExpect(status().isOk());

        // Validate the Countrys in the database
        List<Countrys> countrysList = countrysRepository.findAll();
        assertThat(countrysList).hasSize(databaseSizeBeforeUpdate);
        Countrys testCountrys = countrysList.get(countrysList.size() - 1);
        assertThat(testCountrys.getCountryName()).isEqualTo(UPDATED_COUNTRY_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingCountrys() throws Exception {
        int databaseSizeBeforeUpdate = countrysRepository.findAll().size();

        // Create the Countrys

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCountrysMockMvc.perform(put("/api/countrys")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(countrys)))
            .andExpect(status().isBadRequest());

        // Validate the Countrys in the database
        List<Countrys> countrysList = countrysRepository.findAll();
        assertThat(countrysList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCountrys() throws Exception {
        // Initialize the database
        countrysService.save(countrys);

        int databaseSizeBeforeDelete = countrysRepository.findAll().size();

        // Get the countrys
        restCountrysMockMvc.perform(delete("/api/countrys/{id}", countrys.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Countrys> countrysList = countrysRepository.findAll();
        assertThat(countrysList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Countrys.class);
        Countrys countrys1 = new Countrys();
        countrys1.setId(1L);
        Countrys countrys2 = new Countrys();
        countrys2.setId(countrys1.getId());
        assertThat(countrys1).isEqualTo(countrys2);
        countrys2.setId(2L);
        assertThat(countrys1).isNotEqualTo(countrys2);
        countrys1.setId(null);
        assertThat(countrys1).isNotEqualTo(countrys2);
    }
}
