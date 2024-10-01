import { useMemo } from 'react';
import useSWR from 'swr';

import axiosInstance, { axiosForUpload,
  axiosPatch,
  // axiosPatch, 
  fetcher, 
  fileFetcher
 } from 'src/utils/axios';
import { endpoints } from 'src/utils/endpoints';
import type { Contact, Media, SliderVideo, Translation, } from 'src/utils/types';

const swrOptions = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
};


export function useGetVideos() {
    const url = endpoints.sliderVideos.list;
  
    const { data, isLoading, error, isValidating, mutate } = useSWR<SliderVideo[]>(
      url,
      fetcher,
      swrOptions
    );
  
    const memoizedValue = useMemo(
      () => ({
        videos: data || [],
        videosLoading: isLoading,
        videosError: error,
        videosValidating: isValidating,
        videosEmpty: !isLoading && !data?.length,
        mutate,
      }),
      [data, error, isLoading, isValidating, mutate]
    );
  
    return memoizedValue;
  }

  export const useAddVideo = async (data: { video: File }) => {
    try {
      const url = endpoints.sliderVideos.create;
      const formData = new FormData();
      formData.append('file', data.video);
      formData.append('fileName', data.video.name);
  
      const response = await axiosForUpload.post(url, formData);
      return response;
    } catch (error) {
      console.error('Error during video upload:', error);
      throw error;
    }
  };


export const deleteVideo = async (id: string) => {
    try {
      const url = endpoints.sliderVideos.delete.concat(id);
      const response = await axiosInstance.get(url);
      if (response.data.statusCode === 'OK') {
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error during change:', error);
      return false;
    }
};

export const useGetContactList = ()=>{
  const url = endpoints.contact.list;
  const { data, isLoading, error, isValidating, mutate } = useSWR(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      contacts: data || [],
      contactsLoading: isLoading,
      contactsError: error,
      contactsValidating: isValidating,
      contactsEmpty: !isLoading && !data?.length,
      mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

export const createContact = async (data: Contact) => {
  try {
    const url = endpoints.contact.create;
    const response = await axiosInstance.post(url, data);
    return response;
  } catch (error) {
    console.error('Error during change:', error);
    throw error;
  }
};

export async function updateContact( id: string, data: Contact) {
  try {
    const url = endpoints.contact.update.concat(id);
    const response = await axiosPatch.patch(url, data);
    return response;
  } catch (error) {
    console.error('Error during change:', error);
    throw error;
  }
}

export const useGetCareerList = () =>{
  const url = endpoints.career.list;
  const { data, isLoading, error, isValidating, mutate } = useSWR(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      careers: data || [],
      careersLoading: isLoading,
      careersError: error,
      careersValidating: isValidating,
      careersEmpty: !isLoading && !data?.length,
      mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

export const createCareer = async (data : { translations: Translation[] }) => {    
  try {
    const url = endpoints.career.create;
    const response = await axiosInstance.post(url, {
      date: data.translations[0].expiredDate,
      translations: data.translations,
    });
    return response;
  } catch (error) {
    console.error('Error during change:', error);
    throw error;
  }
};

export const useGetCareerById = (id: string) =>{
  const url = endpoints.career.getById.concat(id);
  const { data, isLoading, error, isValidating, mutate } = useSWR(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      career: data || [],
      careerLoading: isLoading,
      careerError: error,
      careerValidating: isValidating,
      careerEmpty: !isLoading && !data?.length,
      mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

export const updateCareer = async (id: string, expiredDate: string, data : {
  title: string;
  description: string;
  languageCode: string;
}[] ) => {
  console.log(data);
  
  try {
    const url = endpoints.career.update.concat(id);
    const response = await axiosPatch.patch(url, {
      date: expiredDate,
      translations: data,
    });
    return response;
  } catch (error) {
    console.error('Error during change:', error);
    throw error;
  }
}


export const deleteCareerById =async (id: string) =>{
  try {
    const url = endpoints.career.delete.concat(id);
    const response = await axiosInstance.get(url);
    if (response.data.statusCode === 'OK') {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error during change:', error);
    return false;
  }
}


export const useGetMediaList = () =>{
  const url = endpoints.media.listAll;
  const { data, isLoading, error, isValidating, mutate } = useSWR(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      mediaList: data || [],
      mediaListLoading: isLoading,
      mediaListError: error,
      mediaListValidating: isValidating,
      mediaListEmpty: !isLoading && !data?.length,
      mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

export const deleteMediaById = async (id: string) =>{
  try {
    const url = endpoints.media.delete.concat(id);
    const response = await axiosInstance.get(url);
    if (response.data.statusCode === 'OK') {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error during change:', error);
    return false;
  }
}

export const createMedia = async (data: {
  image:string;
  translations: Translation[];
}) => {
  try {
    const url = endpoints.media.create;
    const response = await axiosInstance.post(url, data);
    return response;
  } catch (error) {
    console.error('Error during change:', error);
    throw error;
  }
};

export const useAddFile = async (data: { image: File }) => {
  try {
    const url = endpoints.file.upload;
    const formData = new FormData();
    formData.append('file', data.image);
    formData.append('fileName', data.image.name);

    const response = await axiosForUpload.post(url, formData);
    return response.data;
  } catch (error) {
    console.error('Error during video upload:', error);
    throw error;
  }
};

export const useGetMediaById = ( id :  string ) =>{
  const url = endpoints.media.getById.concat(id);
  const { data, isLoading, error, isValidating, mutate } = useSWR(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      media: data || [],
      mediaLoading: isLoading,
      mediaError: error,
      mediaValidating: isValidating,
      mediaEmpty: !isLoading && !data?.length,
      mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

export function getFile(fileName: string) {
  try {
    const url = endpoints.getFile.getByFileName.concat(fileName);
    const { data, isLoading, error, isValidating, mutate } = useSWR<File>(
      url,
      fileFetcher,
      swrOptions
    );
    const memoizedValue = useMemo(
      () => ({
        file: data || undefined,
        fileLoading: isLoading,
        fileError: error,
        fileValidating: isValidating,
        fileMutate: mutate,
      }),
      [data, error, isLoading, isValidating, mutate]
    );

    return memoizedValue;
  } catch (error) {
    console.error('Error during get file');
    throw error;
  }
}


export function blobToFile(blob: Blob, fileName: string) {
  // Provide the Blob as the first argument, fileName, and set additional options like lastModified and type.
  return new File([blob], fileName, {
    type: blob.type, // Preserve the Blob type (e.g., 'image/webp')
    lastModified: new Date().getTime(), // Optional: current timestamp or another value
  });
}
