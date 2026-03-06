import React, { useState, useEffect } from "react";

export default function Categories() {
    const [display, setDisplay] = useState("0");
    const [previousValue, setPreviousValue] = useState(null);
    const [operation, setOperation] = useState(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);
    const [activeOp, setActiveOp] = useState(null);
    
    // --- Input functions ---
    const inputDigit = (digit) => {
        if (waitingForOperand) {
            setDisplay(String(digit));
            setWaitingForOperand(false);
        } else {
            setDisplay(display === "0" ? String(digit) : display + digit);
        }
    };
    
    const inputDecimal = () => {
        if (waitingForOperand) {
            setDisplay("0.");
            setWaitingForOperand(false);
        } else if (!display.includes(".")) {
            setDisplay(display + ".");
        }
    };
    
    const clear = () => {
        setDisplay("0");
        setPreviousValue(null);
        setOperation(null);
        setWaitingForOperand(false);
        setActiveOp(null);
    };
    
    const toggleSign = () => {
        setDisplay(String(parseFloat(display) * -1));
    };
    
    const inputPercent = () => {
        setDisplay(String(parseFloat(display) / 100));
    };
    
    const calculate = (firstValue, secondValue, operation) => {
        switch (operation) {
            case "+": return firstValue + secondValue;
            case "-": return firstValue - secondValue;
            case "×": return firstValue * secondValue;
            case "÷": return secondValue !== 0 ? firstValue / secondValue : 0;
            default: return secondValue;
        }
    };
    
    const performOperation = (nextOperation) => {
        const inputValue = parseFloat(display);
        
        if (previousValue === null) {
            setPreviousValue(inputValue);
        } else if (operation) {
            const newValue = calculate(previousValue, inputValue, operation);
            setDisplay(String(newValue));
            setPreviousValue(newValue);
        }
        
        setWaitingForOperand(true);
        setOperation(nextOperation === "=" ? null : nextOperation);
        setActiveOp(nextOperation !== "=" ? nextOperation : null);
    };
    
    const handleEquals = () => performOperation("=");
    
    // --- Keyboard support ---
    useEffect(() => {
        const handleKeyDown = (e) => {
            const key = e.key;
            
            if (!isNaN(key)) {
                inputDigit(Number(key));
            } else if (key === ".") {
                inputDecimal();
            } else if (key === "+" || key === "-" || key === "*" || key === "/") {
                const opMap = { "+": "+", "-": "-", "*": "×", "/": "÷" };
                performOperation(opMap[key]);
            } else if (key === "Enter") {
                handleEquals();
            } else if (key === "Backspace") {
                // Delete last digit
                setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
            } else if (key === "%") {
                inputPercent();
            } else if (key === "c" || key === "C") {
                clear();
            }
        };
        
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [display, previousValue, operation, waitingForOperand]);
    
    // --- Styles ---
    const styles = {
        container: {
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "20px",
        },
        calculator: {
            width: "100%",
            maxWidth: "380px",
            padding: "30px",
            borderRadius: "25px",
            background: "linear-gradient(145deg, #1e1e1e, #2d2d2d)",
            boxShadow: "0 25px 70px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
        },
        display: {
            height: "90px",
            marginBottom: "25px",
            padding: "35px 25px",
            borderRadius: "15px",
            background: "linear-gradient(145deg, #252525, #1a1a1a)",
            color: "#fff",
            fontSize: "52px",
            textAlign: "right",
            overflow: "hidden",
            boxShadow: "inset 0 2px 10px rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
        },
        buttons: {
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "15px",
        },
        btn: {
            border: "none",
            borderRadius: "50%",
            fontSize: "26px",
            fontWeight: "500",
            height: "75px",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
        },
        btnGray: {
            background: "linear-gradient(145deg, #5a5a5a, #4a4a4a)",
            color: "#fff",
        },
        btnOrange: {
            background: "linear-gradient(145deg, #ff9500, #ff8000)",
            color: "#fff",
            fontWeight: "600",
        },
        btnOrangeActive: {
            background: "#fff",
            color: "#ff9500",
        },
        btnZero: {
            gridColumn: "span 2",
            textAlign: "left",
            paddingLeft: "35px",
            borderRadius: "40px",
        },
    };
    
    const [hoverStates, setHoverStates] = useState({});
    const handleMouseEnter = (key) => setHoverStates((prev) => ({ ...prev, [key]: true }));
    const handleMouseLeave = (key) => setHoverStates((prev) => ({ ...prev, [key]: false }));
    
    const getButtonStyle = (base, type, key) => {
        let style = { ...base };
        const isHovered = hoverStates[key];
        const isActive = type === "orange" && activeOp === key;
        
        if (type === "gray") style = { ...style, ...styles.btnGray };
        if (type === "orange") style = isActive ? { ...style, ...styles.btnOrangeActive } : { ...style, ...styles.btnOrange };
        if (isHovered) style.transform = "scale(1.05)";
        return style;
    };
    
    const buttons = [
        { label: "AC", type: "gray", onClick: clear },
        { label: "+/-", type: "gray", onClick: toggleSign },
        { label: "%", type: "gray", onClick: inputPercent },
        { label: "÷", type: "orange", onClick: () => performOperation("÷") },
        
        { label: "7", type: "normal", onClick: () => inputDigit(7) },
        { label: "8", type: "normal", onClick: () => inputDigit(8) },
        { label: "9", type: "normal", onClick: () => inputDigit(9) },
        { label: "×", type: "orange", onClick: () => performOperation("×") },
        
        { label: "4", type: "normal", onClick: () => inputDigit(4) },
        { label: "5", type: "normal", onClick: () => inputDigit(5) },
        { label: "6", type: "normal", onClick: () => inputDigit(6) },
        { label: "-", type: "orange", onClick: () => performOperation("-") },
        
        { label: "1", type: "normal", onClick: () => inputDigit(1) },
        { label: "2", type: "normal", onClick: () => inputDigit(2) },
        { label: "3", type: "normal", onClick: () => inputDigit(3) },
        { label: "+", type: "orange", onClick: () => performOperation("+") },
        
        { label: "0", type: "normal", onClick: () => inputDigit(0), extra: styles.btnZero },
        { label: ".", type: "normal", onClick: inputDecimal },
        { label: "=", type: "orange", onClick: handleEquals },
    ];
    
    return (
        <div style={styles.container}>
        <div style={styles.calculator}>
        <div style={styles.display}>{display}</div>
        <div style={styles.buttons}>
        {buttons.map((btn) => (
            <button
            key={btn.label}
            onClick={btn.onClick}
            style={{ ...getButtonStyle(styles.btn, btn.type, btn.label), ...(btn.extra || {}) }}
            onMouseEnter={() => handleMouseEnter(btn.label)}
            onMouseLeave={() => handleMouseLeave(btn.label)}
            >
            {btn.label}
            </button>
        ))}
        </div>
        </div>
        </div>
    );
}
