import React from "react";

export default function Banner({ title = "Welcome to My Site", subtitle = "This is a beautiful banner" }) {
    const styles = {
        banner: {
            position: "relative",
            width: "100%",
            minHeight: "200px",
            borderRadius: "20px",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            textAlign: "center",
            padding: "40px 20px",
            overflow: "hidden",
            boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            cursor: "pointer"
        },
        title: {
            fontSize: "2.5rem",
            fontWeight: "700",
            marginBottom: "10px",
            textShadow: "2px 2px 6px rgba(0,0,0,0.3)"
        },
        subtitle: {
            fontSize: "1.2rem",
            fontWeight: "400",
            textShadow: "1px 1px 4px rgba(0,0,0,0.3)"
        },
        overlay: {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(255,255,255,0.05)",
            pointerEvents: "none",
        }
    };
    
    const handleMouseEnter = (e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow = "0 15px 50px rgba(0,0,0,0.5)";
    };
    
    const handleMouseLeave = (e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 10px 40px rgba(0,0,0,0.3)";
    };
    
    return (
        <div
        style={styles.banner}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        >
        <div style={styles.overlay}></div>
        <h1 style={styles.title}>{title}</h1>
        <p style={styles.subtitle}>{subtitle}</p>
        </div>
    );
}
