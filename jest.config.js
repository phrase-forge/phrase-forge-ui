import { defaults as tsjPreset } from "ts-jest/presets";

export default {
    ...tsjPreset,
    preset: "react-native",
    transform: {
        "^.+\\.jsx$": "babel-jest",
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                tsconfig: "tsconfig.jest.json",
            },
        ],
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};