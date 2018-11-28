package com.yash.hrms.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.yash.hrms.domain.Countrys;
import com.yash.hrms.service.CountrysService;
import com.yash.hrms.web.rest.errors.BadRequestAlertException;
import com.yash.hrms.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Countrys.
 */
@RestController
@RequestMapping("/api")
public class CountrysResource {

    private final Logger log = LoggerFactory.getLogger(CountrysResource.class);

    private static final String ENTITY_NAME = "countrys";

    private final CountrysService countrysService;

    public CountrysResource(CountrysService countrysService) {
        this.countrysService = countrysService;
    }

    /**
     * POST  /countrys : Create a new countrys.
     *
     * @param countrys the countrys to create
     * @return the ResponseEntity with status 201 (Created) and with body the new countrys, or with status 400 (Bad Request) if the countrys has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/countrys")
    @Timed
    public ResponseEntity<Countrys> createCountrys(@RequestBody Countrys countrys) throws URISyntaxException {
        log.debug("REST request to save Countrys : {}", countrys);
        if (countrys.getId() != null) {
            throw new BadRequestAlertException("A new countrys cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Countrys result = countrysService.save(countrys);
        return ResponseEntity.created(new URI("/api/countrys/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /countrys : Updates an existing countrys.
     *
     * @param countrys the countrys to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated countrys,
     * or with status 400 (Bad Request) if the countrys is not valid,
     * or with status 500 (Internal Server Error) if the countrys couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/countrys")
    @Timed
    public ResponseEntity<Countrys> updateCountrys(@RequestBody Countrys countrys) throws URISyntaxException {
        log.debug("REST request to update Countrys : {}", countrys);
        if (countrys.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Countrys result = countrysService.save(countrys);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, countrys.getId().toString()))
            .body(result);
    }

    /**
     * GET  /countrys : get all the countrys.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of countrys in body
     */
    @GetMapping("/countrys")
    @Timed
    public List<Countrys> getAllCountrys() {
        log.debug("REST request to get all Countrys");
        return countrysService.findAll();
    }

    /**
     * GET  /countrys/:id : get the "id" countrys.
     *
     * @param id the id of the countrys to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the countrys, or with status 404 (Not Found)
     */
    @GetMapping("/countrys/{id}")
    @Timed
    public ResponseEntity<Countrys> getCountrys(@PathVariable Long id) {
        log.debug("REST request to get Countrys : {}", id);
        Optional<Countrys> countrys = countrysService.findOne(id);
        return ResponseUtil.wrapOrNotFound(countrys);
    }

    /**
     * DELETE  /countrys/:id : delete the "id" countrys.
     *
     * @param id the id of the countrys to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/countrys/{id}")
    @Timed
    public ResponseEntity<Void> deleteCountrys(@PathVariable Long id) {
        log.debug("REST request to delete Countrys : {}", id);
        countrysService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
