// วิธีที่ 1: กำหนด Interface แยก
interface GreetingProps {
    name: string;
    age?: number;  // Optional prop
}

function Greeting({ name, age }: GreetingProps) {
    return (
        <div>
            <h2>Hello, {name}!</h2>
            {age && <p>You are {age} years old.</p>}
        </div>
    );
}


export default Greeting;