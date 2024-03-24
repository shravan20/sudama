import React, { useState } from 'react';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

const ImageContainer = () => {
    const imageUrls = [
        'https://picsum.photos/200',
        'https://picsum.photos/201',
        'https://picsum.photos/202',
        'https://picsum.photos/203',
        'https://picsum.photos/204  ',
    ];

    const [selectedImageUrl, setSelectedImageUrl] = useState(null);
    const [selectedImage] = useImage(selectedImageUrl);

    const handleImageSelect = (imageUrl) => {
        console.log(imageUrl);
        setSelectedImageUrl(imageUrl);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            {/* Images Div */}
            <div style={{ width: '50%', marginRight: '20px' }}>
                <h2 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '10px' }}>All Varnamalas</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {imageUrls.map((imageUrl, index) => (
                        <div key={index} style={{ margin: '5px', cursor: 'pointer' }} onClick={() => handleImageSelect(imageUrl)}>
                            <img src={imageUrl} width={100} height={100} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Canvas Div */}
            <div style={{ width: '50%', marginLeft: '20px' }}>
                <h2 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '10px' }}>Preview</h2>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', border: '1px solid #ccc' }}>
                    <Stage width={300} height={300}>
                        <Layer>
                            {selectedImage && (
                                <KonvaImage
                                    image={selectedImage}
                                    width={300}
                                    height={300}
                                />
                            )}
                        </Layer>
                    </Stage>
                </div>
            </div>
        </div>
    );
};



export default ImageContainer;
