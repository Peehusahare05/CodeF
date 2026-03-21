import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Layout() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { pathname } = useLocation();
    const drawerRef = useRef(null);
    const menuButtonRef = useRef(null);
    const previousFocusedElementRef = useRef(null);
    const mobileTitleByRoute = {
        "/dashboard": "EcoTrack Dashboard",
        "/track": "Track",
        "/suggestions": "Suggestions",
        "/simulator": "Simulator",
        "/leaderboard": "Leaderboard",
        "/profile": "Profile",
        "/ai-advisor": "AI Advisor",
        "/reduction-simulator": "Simulator",
    };
    const mobileTitle = mobileTitleByRoute[pathname] || "EcoTrack Dashboard";

    useEffect(() => {
        document.body.classList.add("overflow-hidden");
        document.documentElement.classList.add("overflow-hidden");

        return () => {
            document.body.classList.remove("overflow-hidden");
            document.documentElement.classList.remove("overflow-hidden");
        };
    }, []);

    useEffect(() => {
        setIsDrawerOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (!isDrawerOpen) {
            return;
        }

        const drawerElement = drawerRef.current;
        if (!drawerElement) {
            return;
        }

        const selectors = [
            "a[href]",
            "button:not([disabled])",
            "input:not([disabled])",
            "select:not([disabled])",
            "textarea:not([disabled])",
            "[tabindex]:not([tabindex='-1'])",
        ].join(",");

        const getFocusableElements = () =>
            Array.from(drawerElement.querySelectorAll(selectors)).filter((element) => {
                const htmlElement = element;
                return htmlElement.offsetParent !== null;
            });

        previousFocusedElementRef.current = document.activeElement;
        const focusableElements = getFocusableElements();
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }

        const onKeyDown = (event) => {
            if (event.key === "Escape") {
                event.preventDefault();
                setIsDrawerOpen(false);
                return;
            }

            if (event.key !== "Tab") {
                return;
            }

            const orderedFocusableElements = getFocusableElements();
            if (orderedFocusableElements.length === 0) {
                event.preventDefault();
                return;
            }

            const firstElement = orderedFocusableElements[0];
            const lastElement = orderedFocusableElements[orderedFocusableElements.length - 1];
            const activeElement = document.activeElement;

            if (event.shiftKey && activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
                return;
            }

            if (!event.shiftKey && activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        };

        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.removeEventListener("keydown", onKeyDown);

            const previousFocusedElement = previousFocusedElementRef.current;
            if (previousFocusedElement && typeof previousFocusedElement.focus === "function") {
                previousFocusedElement.focus();
            } else if (menuButtonRef.current) {
                menuButtonRef.current.focus();
            }
        };
    }, [isDrawerOpen]);

    useEffect(() => {
        const mainElement = document.getElementById("app-main-content");
        if (!mainElement) {
            return;
        }

        if (isDrawerOpen) {
            mainElement.classList.add("overflow-hidden", "touch-none");
        } else {
            mainElement.classList.remove("overflow-hidden", "touch-none");
        }

        return () => {
            mainElement.classList.remove("overflow-hidden", "touch-none");
        };
    }, [isDrawerOpen]);

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-900">
            <Sidebar widthClass="w-20" compact className="fixed left-0 top-0 hidden md:block lg:hidden" />
            <Sidebar widthClass="w-64" className="fixed left-0 top-0 hidden lg:block" />

            <div
                className={[
                    "fixed inset-0 z-40 bg-slate-900/40 transition-opacity duration-200 md:hidden",
                    isDrawerOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
                ].join(" ")}
                onClick={() => setIsDrawerOpen(false)}
                aria-hidden="true"
            />

            <div
                ref={drawerRef}
                id="mobile-nav-drawer"
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation"
                className={[
                    "fixed inset-y-0 left-0 z-50 transition-transform duration-200 ease-out md:hidden",
                    isDrawerOpen ? "translate-x-0" : "-translate-x-full",
                ].join(" ")}
            >
                <Sidebar
                    widthClass="w-64"
                    showClose
                    onClose={() => setIsDrawerOpen(false)}
                    onNavigate={() => setIsDrawerOpen(false)}
                />
            </div>

            <main id="app-main-content" className="min-w-0 flex-1 h-full overflow-y-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:ml-20 lg:ml-64">
                <div className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 p-3 backdrop-blur max-[359px]:p-2 lg:hidden">
                    <div className="flex items-center gap-3 max-[359px]:gap-2">
                        <button
                            ref={menuButtonRef}
                            type="button"
                            onClick={() => setIsDrawerOpen(true)}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm max-[359px]:h-9 max-[359px]:w-9"
                            aria-label="Open menu"
                            aria-haspopup="dialog"
                            aria-expanded={isDrawerOpen}
                            aria-controls="mobile-nav-drawer"
                        >
                            <Menu className="icon-glyph-sm" />
                        </button>
                        <p className="truncate text-sm font-semibold tracking-wide text-slate-700 max-[359px]:text-xs">{mobileTitle}</p>
                    </div>
                </div>

                <div className="mx-auto w-full max-w-7xl p-3 sm:p-4 lg:p-6 xl:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default Layout;
