import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import Image from 'next/image';

export default function Hero() {
    return (
        <section id="home" className="relative pt-24 pb-16 min-h-screen flex items-center bg-gradient-to-br from-brand-white via-gray-50 to-brand-white overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-10 w-96 h-96 bg-brand-red rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-black rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

                {/* Left Content */}
                <div className="text-center lg:text-left space-y-6">
                    <div className="inline-block">
                        <h1 className="text-5xl md:text-7xl font-extrabold text-brand-black mb-2 tracking-tight">
                            AXION
                        </h1>
                        <div className="h-2 w-full bg-brand-red"></div>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Where Safety Meets <span className="text-brand-red">Innovation</span>
                    </h2>

                    <p className="text-gray-600 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                        Experience the future of helmet technology. Each AXION helmet is meticulously crafted using advanced materials and cutting-edge research to deliver unparalleled protection without compromising style.
                    </p>

                    {/* Key Features */}
                    <div className="grid grid-cols-3 gap-4 pt-6">
                        <div className="text-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
                            <div className="text-3xl font-bold text-brand-red mb-1">99%</div>
                            <div className="text-xs text-gray-600 uppercase font-medium">Impact Protection</div>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
                            <div className="text-3xl font-bold text-brand-red mb-1">5★</div>
                            <div className="text-xs text-gray-600 uppercase font-medium">Safety Rating</div>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
                            <div className="text-3xl font-bold text-brand-red mb-1">24/7</div>
                            <div className="text-xs text-gray-600 uppercase font-medium">Support</div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <a href="#products" className="inline-block bg-brand-red text-white px-10 py-4 rounded-none font-bold uppercase tracking-widest hover:bg-brand-black transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1">
                            Explore Collection
                        </a>
                    </div>

                    {/* Storytelling Elements */}
                    <div className="pt-8 space-y-3 text-sm text-gray-700">
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-brand-red mt-2 flex-shrink-0"></div>
                            <p><strong className="text-brand-black">Premium Materials:</strong> Carbon fiber composite shells with multi-density EPS foam</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-brand-red mt-2 flex-shrink-0"></div>
                            <p><strong className="text-brand-black">Advanced Research:</strong> Developed in collaboration with aerospace engineers</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-brand-red mt-2 flex-shrink-0"></div>
                            <p><strong className="text-brand-black">Innovation First:</strong> Integrated ventilation system with aerodynamic design</p>
                        </div>
                    </div>
                </div>

                {/* Right Slider */}
                <div className="relative h-[500px] lg:h-[600px]">
                    <Swiper
                        spaceBetween={30}
                        effect={'fade'}
                        centeredSlides={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        modules={[Autoplay, EffectFade]}
                        className="h-full w-full rounded-2xl shadow-2xl"
                    >
                        <SwiperSlide className="flex items-center justify-center bg-gradient-to-br from-white to-gray-100">
                            <div className="relative w-full h-full flex items-center justify-center p-8">
                                <Image
                                    src="/helmet-ironman.png"
                                    alt="AXION Iron Man Edition"
                                    width={500}
                                    height={500}
                                    className="object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute bottom-8 left-8 bg-brand-red text-white px-6 py-3 font-bold uppercase tracking-wider">
                                    Iron Man Edition
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="flex items-center justify-center bg-gradient-to-br from-white to-gray-100">
                            <div className="relative w-full h-full flex items-center justify-center p-8">
                                <Image
                                    src="/helmet-spiderman.png"
                                    alt="AXION Spiderman Edition"
                                    width={500}
                                    height={500}
                                    className="object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute bottom-8 left-8 bg-brand-red text-white px-6 py-3 font-bold uppercase tracking-wider">
                                    Spiderman Edition
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="flex items-center justify-center bg-gradient-to-br from-white to-gray-100">
                            <div className="relative w-full h-full flex items-center justify-center p-8">
                                <Image
                                    src="/helmet-red.png"
                                    alt="AXION Max"
                                    width={500}
                                    height={500}
                                    className="object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute bottom-8 left-8 bg-brand-red text-white px-6 py-3 font-bold uppercase tracking-wider">
                                    AXION Max
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>

                    {/* Background Text Decoration */}
                    <div className="absolute -top-10 -right-10 -z-10 text-9xl font-black text-gray-100 opacity-30 select-none hidden lg:block">
                        AXION
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-brand-red rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-brand-red rounded-full mt-2"></div>
                </div>
            </div>
        </section>
    );
}
