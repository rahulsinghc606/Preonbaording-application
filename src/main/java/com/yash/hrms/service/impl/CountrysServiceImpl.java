package com.yash.hrms.service.impl;

import com.yash.hrms.service.CountrysService;
import com.yash.hrms.domain.Countrys;
import com.yash.hrms.repository.CountrysRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Countrys.
 */
@Service
@Transactional
public class CountrysServiceImpl implements CountrysService {

    private final Logger log = LoggerFactory.getLogger(CountrysServiceImpl.class);

    private final CountrysRepository countrysRepository;

    public CountrysServiceImpl(CountrysRepository countrysRepository) {
        this.countrysRepository = countrysRepository;
    }

    /**
     * Save a countrys.
     *
     * @param countrys the entity to save
     * @return the persisted entity
     */
    @Override
    public Countrys save(Countrys countrys) {
        log.debug("Request to save Countrys : {}", countrys);
        return countrysRepository.save(countrys);
    }

    /**
     * Get all the countrys.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Countrys> findAll() {
        log.debug("Request to get all Countrys");
        return countrysRepository.findAll();
    }


    /**
     * Get one countrys by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Countrys> findOne(Long id) {
        log.debug("Request to get Countrys : {}", id);
        return countrysRepository.findById(id);
    }

    /**
     * Delete the countrys by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Countrys : {}", id);
        countrysRepository.deleteById(id);
    }
}
