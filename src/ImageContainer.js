import React, { useState, useRef } from 'react';
import { Stage, Layer, Line, Text, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

const ImageContainer = () => {
    const imageUrls = [
        '../assets/1.jpeg',
        '../assets/2.jpeg',
        '../assets/3.jpeg'
    ];

    const [selectedImageUrl, setSelectedImageUrl] = useState(null);
    const [selectedImage] = useImage(selectedImageUrl);


    const handleImageSelect = (imageUrl) => {
        console.log(imageUrl);
        setSelectedImageUrl(imageUrl);
    };


    const [tool, setTool] = useState('pen');
    const [lines, setLines] = useState([]);
    const isDrawing = useRef(false);

    const handleMouseDown = (e) => {
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        setLines([...lines, { tool, points: [pos.x, pos.y] }]);
    };

    const handleMouseMove = (e) => {
        if (!isDrawing.current) {
            return;
        }
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        let lastLine = lines[lines.length - 1];
        lastLine.points = lastLine.points.concat([point.x, point.y]);
        lines.splice(lines.length - 1, 1, lastLine);
        setLines([...lines]);
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
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
                <h2 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '10px' }}>Canvas Preview</h2>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', border: '1px solid #ccc' }}>
                    <Stage
                        width={300}
                        height={300}
                        onMouseDown={handleMouseDown}
                        onMousemove={handleMouseMove}
                        onMouseup={handleMouseUp}
                    >
                        <Layer>
                            {selectedImage && (
                                <KonvaImage
                                    image={selectedImage}
                                    width={300}
                                    height={300}
                                />
                            )}
                            <Text text="Just start drawing" x={0} y={0} />
                            {lines.map((line, i) => (
                                <Line
                                    key={i}
                                    points={line.points}
                                    stroke="#df4b26"
                                    strokeWidth={5}
                                    tension={0.5}
                                    lineCap="round"
                                    lineJoin="round"
                                    globalCompositeOperation={
                                        line.tool === 'eraser' ? 'destination-out' : 'source-over'
                                    }
                                />
                            ))}
                        </Layer>
                    </Stage>
                </div>
                <select
                    value={tool}
                    onChange={(e) => {
                        setTool(e.target.value);
                    }}
                >
                    <option value="pen">Pen</option>
                    <option value="eraser">Eraser</option>
                </select>
            </div>
        </div>
    );
};



export default ImageContainer;
