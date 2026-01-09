import './TypeBadge.css';

interface TypeBadgeProps {
    typeName: string;
}

function TypeBadge({ typeName }: TypeBadgeProps) {
    return (
        <span className={`type-badge type-${typeName}`}>
      {typeName}
    </span>
    );
}

export default TypeBadge;