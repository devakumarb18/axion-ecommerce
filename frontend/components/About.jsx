export default function About() {
    return (
        <section id="about" className="py-20 bg-brand-black text-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div>
                        <h2 className="text-5xl font-extrabold mb-6">
                            About <span className="text-brand-red">AXION</span>
                        </h2>
                        <div className="h-1 w-24 bg-brand-red mb-8"></div>

                        <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                            AXION represents the pinnacle of helmet engineering. Born from a passion for rider safety and cutting-edge design, we've revolutionized protective gear for the modern era.
                        </p>

                        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                            Every AXION helmet is the result of years of research, collaboration with aerospace engineers, and rigorous testing to ensure maximum protection without compromising comfort or style.
                        </p>

                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="bg-white bg-opacity-5 p-6 rounded-lg">
                                <div className="text-4xl font-bold text-brand-red mb-2">10+</div>
                                <div className="text-sm text-gray-400 uppercase">Years of Innovation</div>
                            </div>
                            <div className="bg-white bg-opacity-5 p-6 rounded-lg">
                                <div className="text-4xl font-bold text-brand-red mb-2">50K+</div>
                                <div className="text-sm text-gray-400 uppercase">Riders Protected</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Features */}
                    <div className="space-y-6">
                        <div className="bg-white bg-opacity-5 p-8 rounded-lg hover:bg-opacity-10 transition-all">
                            <h3 className="text-2xl font-bold mb-4 text-brand-red">Premium Materials</h3>
                            <p className="text-gray-300">
                                Advanced carbon fiber composite shells paired with multi-density EPS foam provide unmatched impact absorption and durability.
                            </p>
                        </div>

                        <div className="bg-white bg-opacity-5 p-8 rounded-lg hover:bg-opacity-10 transition-all">
                            <h3 className="text-2xl font-bold mb-4 text-brand-red">Research & Innovation</h3>
                            <p className="text-gray-300">
                                Developed in collaboration with aerospace engineers and tested in world-class facilities to exceed international safety standards.
                            </p>
                        </div>

                        <div className="bg-white bg-opacity-5 p-8 rounded-lg hover:bg-opacity-10 transition-all">
                            <h3 className="text-2xl font-bold mb-4 text-brand-red">Aerodynamic Design</h3>
                            <p className="text-gray-300">
                                Integrated ventilation systems and wind-tunnel-tested shapes reduce drag and enhance comfort during extended rides.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
