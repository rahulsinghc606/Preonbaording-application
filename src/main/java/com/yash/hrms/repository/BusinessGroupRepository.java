package com.yash.hrms.repository;

import com.yash.hrms.domain.BusinessGroup;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the BusinessGroup entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BusinessGroupRepository extends JpaRepository<BusinessGroup, Long> {

}
