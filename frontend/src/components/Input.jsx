export default function Input({type, placeholder, name, register, id=undefined}) {
    return(
        <input id={id} className="compInput" type={type} placeholder={placeholder} {...register(name)}/>
    )
}