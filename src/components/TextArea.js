import React, {useEffect} from "react";

const TextArea = () => {
    //const [text, setText] = useState("");
    let textArea = React.createRef();
    useEffect(() => {
        //console.log(textArea);
    }, [])
    const style = {};
    return (
        <input type="textarea" className="oncanvas" style={style} ref={textArea}/>
    )
}

export default TextArea;