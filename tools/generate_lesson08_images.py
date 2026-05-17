from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np


OUT = Path("public/generated")
OUT.mkdir(parents=True, exist_ok=True)


def save_pareto_trend():
    defects = ["Particle", "Scratch", "CD Drift", "Mura", "Open", "Etch Residue"]
    counts = np.array([342, 238, 168, 96, 71, 43])
    cumulative = counts.cumsum() / counts.sum() * 100

    weeks = np.arange(1, 9)
    particle = np.array([41, 46, 52, 64, 80, 92, 104, 118])
    scratch = np.array([36, 34, 33, 38, 35, 37, 36, 39])
    cd_drift = np.array([18, 21, 25, 28, 31, 42, 49, 55])

    fig = plt.figure(figsize=(12, 7), dpi=180)
    gs = fig.add_gridspec(2, 2, height_ratios=[1, 0.94], hspace=0.34, wspace=0.22)

    ax1 = fig.add_subplot(gs[0, :])
    bar_colors = ["#0071e3", "#22c55e", "#f59e0b", "#94a3b8", "#c084fc", "#ef4444"]
    ax1.bar(defects, counts, color=bar_colors, width=0.68)
    ax1.set_title("Pareto View: defect priority by contribution", loc="left", fontsize=14, weight="bold")
    ax1.set_ylabel("Defect count")
    ax1.grid(axis="y", alpha=0.18)
    ax1.tick_params(axis="x", rotation=0)
    ax1b = ax1.twinx()
    ax1b.plot(defects, cumulative, color="#111827", marker="o", linewidth=2.4)
    ax1b.axhline(80, color="#ef4444", linestyle="--", linewidth=1.4)
    ax1b.set_ylim(0, 105)
    ax1b.set_ylabel("Cumulative %")
    ax1b.text(4.9, 82, "80% line", color="#ef4444", fontsize=9, weight="bold")

    ax2 = fig.add_subplot(gs[1, 0])
    ax2.plot(weeks, particle, color="#0071e3", marker="o", label="Particle")
    ax2.plot(weeks, scratch, color="#22c55e", marker="o", label="Scratch")
    ax2.plot(weeks, cd_drift, color="#f59e0b", marker="o", label="CD Drift")
    ax2.set_title("Weekly trend: growing defects", loc="left", fontsize=12, weight="bold")
    ax2.set_xlabel("Week")
    ax2.set_ylabel("Count")
    ax2.grid(alpha=0.2)
    ax2.legend(frameon=False, fontsize=8)

    ax3 = fig.add_subplot(gs[1, 1])
    impact = np.array([0.42, 0.24, 0.18, 0.09, 0.05, 0.02])
    effort = np.array([0.32, 0.54, 0.45, 0.62, 0.7, 0.38])
    ax3.scatter(effort, impact, s=counts / 2, c=bar_colors, alpha=0.78, edgecolor="#111827", linewidth=0.6)
    for x, y, label in zip(effort, impact, defects):
        ax3.text(x + 0.015, y + 0.006, label, fontsize=8, weight="bold")
    ax3.set_title("Action matrix: impact vs effort", loc="left", fontsize=12, weight="bold")
    ax3.set_xlabel("Estimated action effort")
    ax3.set_ylabel("Yield impact")
    ax3.set_xlim(0.2, 0.82)
    ax3.set_ylim(0, 0.48)
    ax3.grid(alpha=0.2)

    fig.patch.set_facecolor("white")
    for ax in [ax1, ax2, ax3]:
        ax.set_facecolor("#f8fafc")
        for spine in ax.spines.values():
            spine.set_color("#e5e7eb")
    ax1b.spines["right"].set_color("#e5e7eb")
    fig.savefig(OUT / "lesson08_pareto_trend.png", bbox_inches="tight", facecolor="white")
    plt.close(fig)


def save_workflow():
    fig, ax = plt.subplots(figsize=(12, 3.4), dpi=180)
    ax.axis("off")

    steps = [
        ("Raw defect log", "Panel ID, date,\nline, defect type"),
        ("Clean & group", "Week, process,\ncategory mapping"),
        ("Pareto", "Top contributors\nand cumulative %"),
        ("Trend", "Rising/declining\nfailure modes"),
        ("Action memo", "Owner, hypothesis,\nnext experiment"),
    ]
    x_positions = np.linspace(0.07, 0.93, len(steps))
    colors = ["#eff6ff", "#f0fdf4", "#fffbeb", "#f8fafc", "#fef2f2"]
    edges = ["#0071e3", "#22c55e", "#f59e0b", "#64748b", "#ef4444"]

    for idx, ((title, body), x, color, edge) in enumerate(zip(steps, x_positions, colors, edges)):
        rect = plt.Rectangle((x - 0.085, 0.28), 0.17, 0.42, facecolor=color, edgecolor=edge, linewidth=2, joinstyle="round")
        ax.add_patch(rect)
        ax.text(x, 0.59, title, ha="center", va="center", fontsize=10, weight="bold", color="#111827")
        ax.text(x, 0.43, body, ha="center", va="center", fontsize=8.5, color="#475569", linespacing=1.35)
        if idx < len(steps) - 1:
            ax.annotate("", xy=(x_positions[idx + 1] - 0.105, 0.49), xytext=(x + 0.095, 0.49),
                        arrowprops=dict(arrowstyle="->", color="#94a3b8", lw=2))

    ax.text(0.5, 0.88, "Lesson 08 analysis pipeline: from counted defects to engineering action",
            ha="center", va="center", fontsize=14, weight="bold", color="#111827")
    ax.text(0.5, 0.14, "Goal: convert charts into priority, owner, hypothesis, and the next experiment.",
            ha="center", va="center", fontsize=10, color="#64748b")
    fig.savefig(OUT / "lesson08_workflow.png", bbox_inches="tight", facecolor="white")
    plt.close(fig)


if __name__ == "__main__":
    save_pareto_trend()
    save_workflow()
