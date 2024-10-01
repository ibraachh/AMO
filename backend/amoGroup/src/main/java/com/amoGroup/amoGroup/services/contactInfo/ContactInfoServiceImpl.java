package com.amoGroup.amoGroup.services.contactInfo;

import com.amoGroup.amoGroup.entities.ContactInfo;
import com.amoGroup.amoGroup.repositories.ContactInfoRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class ContactInfoServiceImpl implements ContactInfoService {

    @Autowired
    ContactInfoRepository contactInfoRepository;

    @Override
    public ContactInfo add(ContactInfo request) {
        if (!contactInfoRepository.findAll().isEmpty()) {
            throw new RuntimeException("Contact Info entity is already exists. Try to edit it");
        }

        return contactInfoRepository.insert(request);
    }

    @Override
    public ContactInfo update(ContactInfo request) {
        if (!contactInfoRepository.existsById(request.getId())) {
            throw new RuntimeException("Contact Info with this id does not exist");
        }

        return contactInfoRepository.save(request);
    }

    @Override
    public boolean delete(String id) {
        try {
            ContactInfo contactInfo = contactInfoRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Contact Info with this id does not exist"));

            contactInfoRepository.delete(contactInfo);
            return true;
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
    }

    @Override
    public List<ContactInfo> getContactInfos() {
        return contactInfoRepository.findAll();
    }

    @Override
    public Optional<ContactInfo> getContactInfo(String id) {
        if (!contactInfoRepository.existsById(id)) {
            throw new RuntimeException("Entity not found with this id");
        }
        return contactInfoRepository.findById(id);
    }

    @Override
    public long count() {
        return contactInfoRepository.count();
    }
}
