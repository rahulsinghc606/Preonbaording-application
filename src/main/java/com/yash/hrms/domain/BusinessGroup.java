package com.yash.hrms.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A BusinessGroup.
 */
@Entity
@Table(name = "business_group")
public class BusinessGroup implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "business_group_id")
    private Long businessGroupId;

    @Column(name = "business_group")
    private String businessGroup;

    @Column(name = "business_group_head")
    private String businessGroupHead;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getBusinessGroupId() {
        return businessGroupId;
    }

    public BusinessGroup businessGroupId(Long businessGroupId) {
        this.businessGroupId = businessGroupId;
        return this;
    }

    public void setBusinessGroupId(Long businessGroupId) {
        this.businessGroupId = businessGroupId;
    }

    public String getBusinessGroup() {
        return businessGroup;
    }

    public BusinessGroup businessGroup(String businessGroup) {
        this.businessGroup = businessGroup;
        return this;
    }

    public void setBusinessGroup(String businessGroup) {
        this.businessGroup = businessGroup;
    }

    public String getBusinessGroupHead() {
        return businessGroupHead;
    }

    public BusinessGroup businessGroupHead(String businessGroupHead) {
        this.businessGroupHead = businessGroupHead;
        return this;
    }

    public void setBusinessGroupHead(String businessGroupHead) {
        this.businessGroupHead = businessGroupHead;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        BusinessGroup businessGroup = (BusinessGroup) o;
        if (businessGroup.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), businessGroup.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BusinessGroup{" +
            "id=" + getId() +
            ", businessGroupId=" + getBusinessGroupId() +
            ", businessGroup='" + getBusinessGroup() + "'" +
            ", businessGroupHead='" + getBusinessGroupHead() + "'" +
            "}";
    }
}
