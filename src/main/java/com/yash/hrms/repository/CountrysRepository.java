package com.yash.hrms.repository;

import com.yash.hrms.domain.Countrys;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Countrys entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CountrysRepository extends JpaRepository<Countrys, Long> {

}
