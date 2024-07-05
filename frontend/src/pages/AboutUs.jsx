import React from 'react';
// Replace with your GIF path

const AboutUs = () => {
    return (
        <div className="container mx-auto py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col items-center justify-center mb-8">
                    <h1 className="text-3xl font-bold text-center mb-4">Welcome to bizcart4all</h1>
                    <p className="text-gray-600 text-center mb-4">Your premier destination for multivendor e-commerce</p>
                    <img src alt="Bizcart4all GIF" className="w-full rounded-lg shadow-lg mb-4" />
                    <p className="text-gray-600 text-center">Explore a world of possibilities with us!</p>
                </div>
                <div className="text-center">
                    <h2 className="text-xl font-bold mb-4">Our Mission</h2>
                    <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero et ante gravida, et auctor lorem faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.</p>
                    <p className="text-gray-700">Vivamus venenatis vehicula arcu, vel volutpat ex pulvinar ac. In hac habitasse platea dictumst. Sed id pharetra mi.</p>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
