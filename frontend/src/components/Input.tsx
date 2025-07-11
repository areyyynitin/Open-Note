interface InputProps {
placeholder:string; 
reference?:any


}

export function Input({reference, placeholder }: InputProps){
    return <div>
        <input  ref={reference} placeholder={placeholder} type="text" className="px-4 py-2 border rounded m-2 border-slate-800 outline-none w-60"  />
    </div>
}
