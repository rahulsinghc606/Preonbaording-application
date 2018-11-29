package com.yash.hrms.web.rest;

import com.yash.hrms.PreonboardinApp;

import com.yash.hrms.domain.BusinessGroup;
import com.yash.hrms.repository.BusinessGroupRepository;
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
 * Test class for the BusinessGroupResource REST controller.
 *
 * @see BusinessGroupResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PreonboardinApp.class)
public class BusinessGroupResourceIntTest {

    private static final Long DEFAULT_BUSINESS_GROUP_ID = 1L;
    private static final Long UPDATED_BUSINESS_GROUP_ID = 2L;

    private static final String DEFAULT_BUSINESS_GROUP = "AAAAAAAAAA";
    private static final String UPDATED_BUSINESS_GROUP = "BBBBBBBBBB";

    private static final String DEFAULT_BUSINESS_GROUP_HEAD = "AAAAAAAAAA";
    private static final String UPDATED_BUSINESS_GROUP_HEAD = "BBBBBBBBBB";

    @Autowired
    private BusinessGroupRepository businessGroupRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBusinessGroupMockMvc;

    private BusinessGroup businessGroup;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BusinessGroupResource businessGroupResource = new BusinessGroupResource(businessGroupRepository);
        this.restBusinessGroupMockMvc = MockMvcBuilders.standaloneSetup(businessGroupResource)
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
    public static BusinessGroup createEntity(EntityManager em) {
        BusinessGroup businessGroup = new BusinessGroup()
            .businessGroupId(DEFAULT_BUSINESS_GROUP_ID)
            .businessGroup(DEFAULT_BUSINESS_GROUP)
            .businessGroupHead(DEFAULT_BUSINESS_GROUP_HEAD);
        return businessGroup;
    }

    @Before
    public void initTest() {
        businessGroup = createEntity(em);
    }

    @Test
    @Transactional
    public void createBusinessGroup() throws Exception {
        int databaseSizeBeforeCreate = businessGroupRepository.findAll().size();

        // Create the BusinessGroup
        restBusinessGroupMockMvc.perform(post("/api/business-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(businessGroup)))
            .andExpect(status().isCreated());

        // Validate the BusinessGroup in the database
        List<BusinessGroup> businessGroupList = businessGroupRepository.findAll();
        assertThat(businessGroupList).hasSize(databaseSizeBeforeCreate + 1);
        BusinessGroup testBusinessGroup = businessGroupList.get(businessGroupList.size() - 1);
        assertThat(testBusinessGroup.getBusinessGroupId()).isEqualTo(DEFAULT_BUSINESS_GROUP_ID);
        assertThat(testBusinessGroup.getBusinessGroup()).isEqualTo(DEFAULT_BUSINESS_GROUP);
        assertThat(testBusinessGroup.getBusinessGroupHead()).isEqualTo(DEFAULT_BUSINESS_GROUP_HEAD);
    }

    @Test
    @Transactional
    public void createBusinessGroupWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = businessGroupRepository.findAll().size();

        // Create the BusinessGroup with an existing ID
        businessGroup.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBusinessGroupMockMvc.perform(post("/api/business-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(businessGroup)))
            .andExpect(status().isBadRequest());

        // Validate the BusinessGroup in the database
        List<BusinessGroup> businessGroupList = businessGroupRepository.findAll();
        assertThat(businessGroupList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBusinessGroups() throws Exception {
        // Initialize the database
        businessGroupRepository.saveAndFlush(businessGroup);

        // Get all the businessGroupList
        restBusinessGroupMockMvc.perform(get("/api/business-groups?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(businessGroup.getId().intValue())))
            .andExpect(jsonPath("$.[*].businessGroupId").value(hasItem(DEFAULT_BUSINESS_GROUP_ID.intValue())))
            .andExpect(jsonPath("$.[*].businessGroup").value(hasItem(DEFAULT_BUSINESS_GROUP.toString())))
            .andExpect(jsonPath("$.[*].businessGroupHead").value(hasItem(DEFAULT_BUSINESS_GROUP_HEAD.toString())));
    }
    
    @Test
    @Transactional
    public void getBusinessGroup() throws Exception {
        // Initialize the database
        businessGroupRepository.saveAndFlush(businessGroup);

        // Get the businessGroup
        restBusinessGroupMockMvc.perform(get("/api/business-groups/{id}", businessGroup.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(businessGroup.getId().intValue()))
            .andExpect(jsonPath("$.businessGroupId").value(DEFAULT_BUSINESS_GROUP_ID.intValue()))
            .andExpect(jsonPath("$.businessGroup").value(DEFAULT_BUSINESS_GROUP.toString()))
            .andExpect(jsonPath("$.businessGroupHead").value(DEFAULT_BUSINESS_GROUP_HEAD.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBusinessGroup() throws Exception {
        // Get the businessGroup
        restBusinessGroupMockMvc.perform(get("/api/business-groups/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBusinessGroup() throws Exception {
        // Initialize the database
        businessGroupRepository.saveAndFlush(businessGroup);

        int databaseSizeBeforeUpdate = businessGroupRepository.findAll().size();

        // Update the businessGroup
        BusinessGroup updatedBusinessGroup = businessGroupRepository.findById(businessGroup.getId()).get();
        // Disconnect from session so that the updates on updatedBusinessGroup are not directly saved in db
        em.detach(updatedBusinessGroup);
        updatedBusinessGroup
            .businessGroupId(UPDATED_BUSINESS_GROUP_ID)
            .businessGroup(UPDATED_BUSINESS_GROUP)
            .businessGroupHead(UPDATED_BUSINESS_GROUP_HEAD);

        restBusinessGroupMockMvc.perform(put("/api/business-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBusinessGroup)))
            .andExpect(status().isOk());

        // Validate the BusinessGroup in the database
        List<BusinessGroup> businessGroupList = businessGroupRepository.findAll();
        assertThat(businessGroupList).hasSize(databaseSizeBeforeUpdate);
        BusinessGroup testBusinessGroup = businessGroupList.get(businessGroupList.size() - 1);
        assertThat(testBusinessGroup.getBusinessGroupId()).isEqualTo(UPDATED_BUSINESS_GROUP_ID);
        assertThat(testBusinessGroup.getBusinessGroup()).isEqualTo(UPDATED_BUSINESS_GROUP);
        assertThat(testBusinessGroup.getBusinessGroupHead()).isEqualTo(UPDATED_BUSINESS_GROUP_HEAD);
    }

    @Test
    @Transactional
    public void updateNonExistingBusinessGroup() throws Exception {
        int databaseSizeBeforeUpdate = businessGroupRepository.findAll().size();

        // Create the BusinessGroup

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBusinessGroupMockMvc.perform(put("/api/business-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(businessGroup)))
            .andExpect(status().isBadRequest());

        // Validate the BusinessGroup in the database
        List<BusinessGroup> businessGroupList = businessGroupRepository.findAll();
        assertThat(businessGroupList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBusinessGroup() throws Exception {
        // Initialize the database
        businessGroupRepository.saveAndFlush(businessGroup);

        int databaseSizeBeforeDelete = businessGroupRepository.findAll().size();

        // Get the businessGroup
        restBusinessGroupMockMvc.perform(delete("/api/business-groups/{id}", businessGroup.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BusinessGroup> businessGroupList = businessGroupRepository.findAll();
        assertThat(businessGroupList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BusinessGroup.class);
        BusinessGroup businessGroup1 = new BusinessGroup();
        businessGroup1.setId(1L);
        BusinessGroup businessGroup2 = new BusinessGroup();
        businessGroup2.setId(businessGroup1.getId());
        assertThat(businessGroup1).isEqualTo(businessGroup2);
        businessGroup2.setId(2L);
        assertThat(businessGroup1).isNotEqualTo(businessGroup2);
        businessGroup1.setId(null);
        assertThat(businessGroup1).isNotEqualTo(businessGroup2);
    }
}
