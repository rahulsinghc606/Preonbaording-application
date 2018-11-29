package com.yash.hrms.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.yash.hrms.domain.BusinessGroup;
import com.yash.hrms.repository.BusinessGroupRepository;
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
 * REST controller for managing BusinessGroup.
 */
@RestController
@RequestMapping("/api")
public class BusinessGroupResource {

    private final Logger log = LoggerFactory.getLogger(BusinessGroupResource.class);

    private static final String ENTITY_NAME = "businessGroup";

    private final BusinessGroupRepository businessGroupRepository;

    public BusinessGroupResource(BusinessGroupRepository businessGroupRepository) {
        this.businessGroupRepository = businessGroupRepository;
    }

    /**
     * POST  /business-groups : Create a new businessGroup.
     *
     * @param businessGroup the businessGroup to create
     * @return the ResponseEntity with status 201 (Created) and with body the new businessGroup, or with status 400 (Bad Request) if the businessGroup has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/business-groups")
    @Timed
    public ResponseEntity<BusinessGroup> createBusinessGroup(@RequestBody BusinessGroup businessGroup) throws URISyntaxException {
        log.debug("REST request to save BusinessGroup : {}", businessGroup);
        if (businessGroup.getId() != null) {
            throw new BadRequestAlertException("A new businessGroup cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BusinessGroup result = businessGroupRepository.save(businessGroup);
        return ResponseEntity.created(new URI("/api/business-groups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /business-groups : Updates an existing businessGroup.
     *
     * @param businessGroup the businessGroup to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated businessGroup,
     * or with status 400 (Bad Request) if the businessGroup is not valid,
     * or with status 500 (Internal Server Error) if the businessGroup couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/business-groups")
    @Timed
    public ResponseEntity<BusinessGroup> updateBusinessGroup(@RequestBody BusinessGroup businessGroup) throws URISyntaxException {
        log.debug("REST request to update BusinessGroup : {}", businessGroup);
        if (businessGroup.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BusinessGroup result = businessGroupRepository.save(businessGroup);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, businessGroup.getId().toString()))
            .body(result);
    }

    /**
     * GET  /business-groups : get all the businessGroups.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of businessGroups in body
     */
    @GetMapping("/business-groups")
    @Timed
    public List<BusinessGroup> getAllBusinessGroups() {
        log.debug("REST request to get all BusinessGroups");
        return businessGroupRepository.findAll();
    }

    /**
     * GET  /business-groups/:id : get the "id" businessGroup.
     *
     * @param id the id of the businessGroup to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the businessGroup, or with status 404 (Not Found)
     */
    @GetMapping("/business-groups/{id}")
    @Timed
    public ResponseEntity<BusinessGroup> getBusinessGroup(@PathVariable Long id) {
        log.debug("REST request to get BusinessGroup : {}", id);
        Optional<BusinessGroup> businessGroup = businessGroupRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(businessGroup);
    }

    /**
     * DELETE  /business-groups/:id : delete the "id" businessGroup.
     *
     * @param id the id of the businessGroup to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/business-groups/{id}")
    @Timed
    public ResponseEntity<Void> deleteBusinessGroup(@PathVariable Long id) {
        log.debug("REST request to delete BusinessGroup : {}", id);

        businessGroupRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
