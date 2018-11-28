package com.yash.hrms.service;

import com.yash.hrms.domain.Countrys;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Countrys.
 */
public interface CountrysService {

    /**
     * Save a countrys.
     *
     * @param countrys the entity to save
     * @return the persisted entity
     */
    Countrys save(Countrys countrys);

    /**
     * Get all the countrys.
     *
     * @return the list of entities
     */
    List<Countrys> findAll();


    /**
     * Get the "id" countrys.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Countrys> findOne(Long id);

    /**
     * Delete the "id" countrys.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
