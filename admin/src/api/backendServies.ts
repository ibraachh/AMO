import { useMemo } from 'react';
import useSWR from 'swr';

import axiosInstance, { axiosForUpload,
  axiosPatch,
  // axiosPatch, 
  fetcher, 
  fileFetcher
 } from 'src/utils/axios';
import { endpoints } from 'src/utils/endpoints';
import type { Company, Contact, Info, SliderVideo, Translation, Value, } from 'src/utils/types';

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

export async function updatePost(id: string, data:{
  coverImage: string;
  translations: Translation[];
}) {
  try {
    const url = endpoints.media.update.concat(id);
    const response = await axiosPatch.patch(url, {
      image: data.coverImage,      
      translations: data.translations
    });
    return response;
  } catch (error) {
    console.error('Error during change:', error);
    throw error;
  }
}


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

export const uploadFile = async (file: File, fileName: string, isSlide: boolean) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('fileName', fileName);
  formData.append('isSlide', isSlide.toString());

  try {
    const response = await axiosForUpload.post('/api/file/uploadFile', formData);
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

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


export async function updateInfo(id: string, data: Info) {
  try {
    const url = endpoints.about.info.update.concat(id);
    const response = await axiosPatch.patch(url, data);
    return response;
  } catch (error) {
    console.error('Error during change:', error);
    throw error;
  }
}

export const useCreateInfo = async (data: Info) => {
  try {
    const url = endpoints.about.info.create;
    const response = await axiosInstance.post(url, data);
    return response;
  } catch (error) {
    console.error('Error during change:', error);
    throw error;
  }
};

export function useGetAllInfo() {
  const url = endpoints.about.info.getAll;

  const { data, isLoading, error, isValidating, mutate } = useSWR<Info[]>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      data: data || [],
      dataLoading: isLoading,
      dataError: error,
      dataValidating: isValidating,
      infoEmpty: !isLoading && !data?.length,
      mutate,
    }),
    [error, isLoading, isValidating, data, mutate]
  );

  return memoizedValue;
}
export function useGetAllValues() {
  const url = endpoints.about.value.getAll;

  const { data, isLoading, error, isValidating, mutate } = useSWR<Value[]>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      values: data || [],
      valuesLoading: isLoading,
      valueError: error,
      valueValidating: isValidating,
      infoEmpty: !isLoading && !data?.length,
      mutate,
    }),
    [error, isLoading, isValidating, data, mutate]
  );

  return memoizedValue;
}

export const useGetValueById = ( id :  string ) =>{
  const url = endpoints.about.value.getById.concat(id);
  const { data, isLoading, error, isValidating, mutate } = useSWR(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      value: data || [],
      valueLoading: isLoading,
      valueError: error,
      valueValidating: isValidating,
      valueEmpty: !isLoading && !data?.length,
      mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

export async function updateValue(id: string, data:{
  translations: Translation[];
}) {
  try {
    const url = endpoints.about.value.update.concat(id);
    const response = await axiosPatch.patch(url, data);
    return response;
  } catch (error) {
    console.error('Error during change:', error);
    throw error;
  }
}

export const useCreateValue = async (data: Info) => {
  try {
    const url = endpoints.about.value.create;
    const response = await axiosInstance.post(url, data);
    return response;
  } catch (error) {
    console.error('Error during change:', error);
    throw error;
  }
};

export function useGetAllMissions() {
  const url = endpoints.about.mission.getAll;

  const { data, isLoading, error, isValidating, mutate } = useSWR<Value[]>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      missions: data || [],
      missionsLoading: isLoading,
      missionError: error,
      missionValidating: isValidating,
      infoEmpty: !isLoading && !data?.length,
      mutate,
    }),
    [error, isLoading, isValidating, data, mutate]
  );

  return memoizedValue;
}

export const useGetMissionById = ( id :  string ) =>{
  const url = endpoints.about.mission.getById.concat(id);
  const { data, isLoading, error, isValidating, mutate } = useSWR(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      mission: data || [],
      missionLoading: isLoading,
      missionError: error,
      missionValidating: isValidating,
      missionEmpty: !isLoading && !data?.length,
      mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

export async function updateMission(id: string, data:{
  translations: Translation[];
}) {
  try {
    const url = endpoints.about.mission.update.concat(id);
    const response = await axiosPatch.patch(url, data);
    return response;
  } catch (error) {
    console.error('Error during change:', error);
    throw error;
  }
}

export const useCreateMission = async (data: Info) => {
  try {
    const url = endpoints.about.mission.create;
    const response = await axiosInstance.post(url, data);
    return response;
  } catch (error) {
    console.error('Error during change:', error);
    throw error;
  }
};


export function useGetAll() {
  const url = endpoints.about.mission.getAll;

  const { data, isLoading, error, isValidating, mutate } = useSWR<Value[]>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      missions: data || [],
      missionsLoading: isLoading,
      missionError: error,
      missionValidating: isValidating,
      infoEmpty: !isLoading && !data?.length,
      mutate,
    }),
    [error, isLoading, isValidating, data, mutate]
  );

  return memoizedValue;
}

export function useGetAllHistory() {
  const url = endpoints.about.history.getAll;

  const { data, isLoading, error, isValidating, mutate } = useSWR<Info[]>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      history: data || [],
      historyLoading: isLoading,
      historyError: error,
      historyValidating: isValidating,
      infoEmpty: !isLoading && !data?.length,
      mutate,
    }),
    [error, isLoading, isValidating, data, mutate]
  );

  return memoizedValue;
}

export async function updateHistory(id: string, data:{
  translations: Translation[];
}) {
  try {
    const url = endpoints.about.history.update.concat(id);
    const response = await axiosPatch.patch(url, data);
    return response;
  } catch (error) {
    console.error('Error during change:', error);
    throw error;
  }
}

export const useCreateHistory = async (data: Info) => {
  try {
    const url = endpoints.about.history.create;
    const response = await axiosInstance.post(url, data);
    return response;
  } catch (error) {
    console.error('Error during change:', error);
    throw error;
  }
};


export function useGetAllChronology() {
  const url = endpoints.about.chronology.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR<Value[]>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      chronology: data || [],
      chronologyLoading: isLoading,
      chronologyError: error,
      chronologyValidating: isValidating,
      chronologyEmpty: !isLoading && !data?.length,
      mutate,
    }),
    [error, isLoading, isValidating, data, mutate]
  );

  return memoizedValue;
}

export const useCreateChronology = async (data: Info) => {
  try {
    const url = endpoints.about.chronology.create;
    const response = await axiosInstance.post(url, data);
    return response;
  } catch (error) {
    console.error('Error during change:', error);
    throw error;
  }
};

export async function updateChronologyById(id: string, data:{
  translations: Translation[];
}) {
  try {
    const url = endpoints.about.history.update.concat(id);
    const response = await axiosPatch.patch(url, data);
    return response;
  } catch (error) {
    console.error('Error during change:', error);
    throw error;
  }
}

export const useGetChronologyById = ( id :  string ) =>{
  const url = endpoints.about.chronology.getById.concat(id);
  const { data, isLoading, error, isValidating, mutate } = useSWR(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      chronology: data || [],
      chronologyLoading: isLoading,
      chronologyError: error,
      chronologyValidating: isValidating,
      chronologyEmpty: !isLoading && !data?.length,
      mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

export const deleteChronologyById = async (id: string) => {
  try {
    const url = endpoints.about.chronology.delete.concat(id);
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

export async function updateChronology(id: string, data:{
  translations: Translation[];
}) {
  try {
    const url = endpoints.about.chronology.update.concat(id);
    const response = await axiosPatch.patch(url, data);
    return response;
  } catch (error) {
    console.error('Error during change:', error);
    throw error;
  }
}


export function useGetAllMessage() {
  const url = endpoints.about.founderMessage.getAll;

  const { data, isLoading, error, isValidating, mutate } = useSWR<Info[]>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      message: data || [],
      messageLoading: isLoading,
      messageError: error,
      messageValidating: isValidating,
      messageEmpty: !isLoading && !data?.length,
      mutate,
    }),
    [error, isLoading, isValidating, data, mutate]
  );

  return memoizedValue;
}

export async function updateMessage(id: string, data:{
  translations: Translation[];
}) {
  try {
    const url = endpoints.about.founderMessage.update.concat(id);
    const response = await axiosPatch.patch(url, data);
    return response;
  } catch (error) {
    console.error('Error during change:', error);
    throw error;
  }
}

export const useCreateMessage = async (data: Info) => {
  try {
    const url = endpoints.about.founderMessage.create;
    const response = await axiosInstance.post(url, data);
    return response;
  } catch (error) {
    console.error('Error during change:', error);
    throw error;
  }
};


export function useGetCompanyAllByName(name: string) {
  const url = endpoints.companies.getCompanyAllByName.concat(name);

  const { data, isLoading, error, isValidating, mutate } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      company: data || [],
      companyLoading: isLoading,
      companyError: error,
      companyValidating: isValidating,
      mutate,
    }),
    [error, isLoading, isValidating, data, mutate]
  );

  return memoizedValue;
}
export function useGetCompany(name: string) {
  const url = endpoints.companies.getCompanyByName.concat(name);

  const { data, isLoading, error, isValidating, mutate } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      company: data || [],
      companyLoading: isLoading,
      companyError: error,
      companyValidating: isValidating,
      mutate,
    }),
    [error, isLoading, isValidating, data, mutate]
  );

  return memoizedValue;
}
export function useGetCompanyCardDetail(id: string) {
  const url = endpoints.companies.getCard.concat(id);

  const { data, isLoading, error, isValidating, mutate } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      data: data || [],
      dataLoading: isLoading,
      dataError: error,
      dataValidating: isValidating,
      mutate,
    }),
    [error, isLoading, isValidating, data, mutate]
  );

  return memoizedValue;
}

export async function deleteCompanyCardById(companyId: string, cardId: string) {
  try {
    const url = `${endpoints.companies.deleteCard}${companyId}/${cardId}`;
    const response = await axiosInstance.get(url);

    return response.data; // Başarılı olursa döndürülecek değer
  } catch (error) {
    console.error('Error deleting company card:', error);
    return null; // Hata durumunda null döndürüyoruz
  }
}


export async function updateCompanyCardById(id: string, data:{
  translations: Translation[];
}) {
  try {
    const url = endpoints.companies.updateCard.concat(id);
    const response = await axiosPatch.patch(url, data);
    return response;
  } catch (error) {
    console.error('Error during change:', error);
    throw error;
  }
}
export async function updateCompany(id: string, data:{
  logo?: string;
  translations: Translation[];
}) {
  try {
    const url = endpoints.companies.updateCompany.concat(id);
    const response = await axiosPatch.patch(url, data);
    return response;
  } catch (error) {
    console.error('Error during change:', error);
    throw error;
  }
}


export const useCreateCompany = async (data: Company) => {
  try {
    const url = endpoints.about.chronology.create;
    const response = await axiosInstance.post(url, data);
    return response;
  } catch (error) {
    console.error('Error during change:', error);
    throw error;
  }
};

