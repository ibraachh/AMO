package com.amoGroup.amoGroup.services.contactInfo;

import com.amoGroup.amoGroup.entities.ContactInfo;

import java.util.List;
import java.util.Optional;

public interface ContactInfoService {

    ContactInfo add(ContactInfo contactInfo);

    ContactInfo update(ContactInfo contactInfo);

    boolean delete(String id);

    List<ContactInfo> getContactInfos();

    Optional<ContactInfo> getContactInfo(String id);

    long count();
}
