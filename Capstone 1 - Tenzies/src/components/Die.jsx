export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    
    return (
        <button className="die-btn" style={styles} onClick={props.onClick}>
            {props.value}
        </button>
    )
}