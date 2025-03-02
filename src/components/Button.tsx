interface ButtonProops {
    color: string;
    textColor?: string;
    children: React.ReactNode;
    clickCallback: () => void;
}
export default function Button({ color, clickCallback, textColor, children }: ButtonProops) {
    return (
        <button
            onClick={clickCallback}
            className='cursor-pointer outline-2 transition  hover:text-white p-2 rounded-md'
            style={{
                "color": textColor ?? '#fff',
                "hoverBackgroundColor": color,
                "outlineColor": color,
            } as React.CSSProperties}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = color;
                e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = textColor ?? '#fff';

            }}
        >
            {children}
        </button >
    )
}