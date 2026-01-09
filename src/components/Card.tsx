// Wrapper Component ที่รับ children
interface CardProps {
    title: string;
    children: React.ReactNode;  // รับ JSX หรือ text อะไรก็ได้
}

function Card({ title, children }: CardProps) {
    return (
        <div className="card">
            <div className="card-header">
                <h3>{title}</h3>
            </div>
            <div className="card-body">
                {children}
            </div>
        </div>
    );
}


export default Card;