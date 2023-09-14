export default function Input({type, placeholder, name, register}) {
    return(
        <input className="compInput" type={type} placeholder={placeholder} {...register(name)}/>
    )
}