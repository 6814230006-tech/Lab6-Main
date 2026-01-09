// Props ที่พบบ่อยใน React
interface ExampleProps {
    // Primitive types
    name: string;
    count: number;
    isActive: boolean;

    // Arrays
    items: string[];
    ids: number[];

    // Objects
    user: {
        id: number;
        name: string;
    };

    // Functions (Event Handlers)
    onClick: () => void;
    onSubmit: (value: string) => void;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

    // Optional props
    title?: string;
    subtitle?: string;

    // Children (สำหรับ Wrapper components)
    children: React.ReactNode;

    // CSS className
    className?: string;

    // Style object
    style?: React.CSSProperties;
}

function ExampleComponent({
                              name,
                              count,
                              isActive,
                              items,
                              onClick,
                              children,
                              className = '',  // Default value
                              style
                          }: ExampleProps) {
    return (
        <div className={`example ${className}`} style={style}>
            <h2>{name}</h2>
            <p>Count: {count}</p>
            <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
            <ul>
                {items.map((item, i) => (
                    <li key={i}>{item}</li>
                ))}
            </ul>
            <button onClick={onClick}>Click me</button>
            {children}
        </div>
    );
}

export default ExampleComponent;
