interface Props {
    title?:string,
    content:any
}

const Card = ({title, content}:Props) => (
    <div className="w-full sm:w-1/2 bg-white rounded p-4 mt-8 mx-auto p-0">
        {title && <div className="p-2 border-bottom border-b-2 border-slate-300 text-2xl">{ title }</div> }
        <div className="card-body p-2 text-center">{ content }</div>
    </div>
)

export default Card;