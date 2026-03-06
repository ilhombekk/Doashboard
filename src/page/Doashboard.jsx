import React from "react";

export default function Doashboard({
    username = "John Doe",
    stats = [
        { label: "Users", value: 1200, change: "+12%" },
        { label: "Sales", value: "$8,400", change: "+8%" },
        { label: "Orders", value: 320, change: "-3%" },
        { label: "Revenue", value: "$24,000", change: "+15%" },
    ]
}) {
    
    const styles = {
        banner: {
            width: "100%",
            borderRadius: "20px",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            padding: "25px 15px", // mobilga mos
            color: "#fff",
            boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
            marginBottom: "20px",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
        },
        header: { marginBottom: "15px" },
        title: { fontSize: "1.5rem", fontWeight: "700", marginBottom: "5px", textShadow: "1px 1px 6px rgba(0,0,0,0.3)" },
        subtitle: { fontSize: "1rem", fontWeight: "400", textShadow: "1px 1px 4px rgba(0,0,0,0.3)" },
        statsContainer: { display: "flex", gap: "10px", flexWrap: "wrap" }, // wrap tor ekranlar uchun
        statCard: {
            background: "rgba(255,255,255,0.1)",
            borderRadius: "15px",
            padding: "15px",
            minWidth: "140px",
            flex: "1 1 140px",
            textAlign: "center",
            transition: "background 0.3s ease, transform 0.3s ease",
        },
        statValue: { fontSize: "1.2rem", fontWeight: "700", marginBottom: "5px" },
        statLabel: { fontSize: "0.85rem", marginBottom: "8px" },
        statChange: { fontSize: "0.8rem", color: "#00ff99" },
        progressBarContainer: { background: "rgba(255,255,255,0.2)", borderRadius: "10px", height: "8px", marginTop: "5px", overflow: "hidden" },
        progressBar: { height: "8px", borderRadius: "10px", background: "#00ff99", transition: "width 0.5s ease" },
    };
    
    const handleMouseEnter = (e) => {
        e.currentTarget.style.transform = "scale(1.02)";
        e.currentTarget.style.boxShadow = "0 12px 45px rgba(0,0,0,0.5)";
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
        <div style={styles.header}>
        <h1 style={styles.title}>Welcome back, {username}!</h1>
        <p style={styles.subtitle}>Here’s a quick summary of your dashboard</p>
        </div>
        
        <div style={styles.statsContainer}>
        {stats.map((stat, idx) => {
            const numericValue = parseFloat(stat.value.toString().replace(/[^0-9.-]+/g,""));
            const progressWidth = numericValue ? Math.min(100, numericValue / 100) : 0;
            
            return (
                <div key={idx} style={styles.statCard}>
                <div style={styles.statValue}>{stat.value}</div>
                <div style={styles.statLabel}>{stat.label}</div>
                {stat.change && <div style={styles.statChange}>{stat.change}</div>}
                <div style={styles.progressBarContainer}>
                <div style={{...styles.progressBar, width: `${progressWidth}%`}}></div>
                </div>
                </div>
            );
        })}
        </div>
        </div>
    );
}
