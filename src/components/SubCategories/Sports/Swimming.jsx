// Updated Swimming.jsx

import { Card, CardContent, Typography } from '@mui/material';

const Swimming = () => {
    const images = [
        "https://source.unsplash.com/random/300x300?swimming",
        "https://source.unsplash.com/random/300x300?pool",
        "https://source.unsplash.com/random/300x300?goggles",
        "https://source.unsplash.com/random/300x300?swimsuit",
        "https://source.unsplash.com/random/300x300?dive",
        "https://source.unsplash.com/random/300x300?water",
        "https://source.unsplash.com/random/300x300?race",
        "https://source.unsplash.com/random/300x300?training",
        "https://source.unsplash.com/random/300x300?trophy",
    ];

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <Typography variant="h3" className="font-bold text-center mb-6 text-blue-400">
                Swimming
            </Typography>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {images.map((image, index) => (
                    <Card key={index} className="bg-white shadow-xl hover:shadow-2xl transition-shadow">
                        <CardContent>
                            <img src={image} alt={`Swimming ${index + 1}`} className="w-full h-48 object-cover rounded-lg mb-4" />
                            <Typography variant="h5" className="font-semibold">
                                Swimming Product {index + 1}
                            </Typography>
                            <Typography variant="body2" className="mt-2 text-gray-600">
                                Description of the swimming product.
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Swimming;
