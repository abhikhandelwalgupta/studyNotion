function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror= () =>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}
export async function buyCourse(token , course , useDetails , navigate , dispatch) {

    try {
        
    }catch(error) {
        console.log(error);
    }
}