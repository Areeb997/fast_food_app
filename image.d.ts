// it simply say to our react-native app that there are png, jpg , jpeg , gif , svg and you need to import them if they export somewhere . 
declare module "*.png" {
    const value: any;
    export default value;
}

declare module "*.jpg" {
    const value: any;
    export default value;
}

declare module "*.jpeg" {
    const value: any;
    export default value;
}

declare module "*.gif" {
    const value: any;
    export default value;
}

declare module "*.svg" {
    const value: any;
    export default value;
}
declare module "*.ttf" {  // i add this by my own to recognize .ttf file by typescript . 
    const value: any;
    export default value;
}