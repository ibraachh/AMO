import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel } from "swiper/modules";
import { VideoUrlType } from "../pages/Home";
import "swiper/css";
import "../../assets/css/home.css";

interface SliderProps {
  videoURL: VideoUrlType[];
}

const Slider: React.FC<SliderProps> = ({ videoURL }) => {
  return (
    <Swiper
      direction="vertical"
      spaceBetween={30}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 8000,
        disableOnInteraction: false,
      }}
      mousewheel={true}
      modules={[Autoplay, Mousewheel]}
      className="mySwiper"
    >
      <SwiperSlide>
        <div className="slide-img flex items-center justify-center"></div>
      </SwiperSlide>
      {videoURL &&
        videoURL.map((item) => (
          <SwiperSlide key={item.id}>
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            >
              <source
                src={`https://api.studentall.az:9851/api/file/getFile/${item.videoUrl}`}
                type="video/mp4"
              />
              Sənin browser video formatını dəstəkləmir.
            </video>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default Slider;
