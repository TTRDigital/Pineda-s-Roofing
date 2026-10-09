/** GoHighLevel chat widget ID (public). The env var overrides it; "off" disables the widget. */
const envId = process.env.NEXT_PUBLIC_GHL_CHAT_WIDGET_ID;
export const chatWidgetId = envId === "off" ? "" : envId || "6ab171dc2251fa79522366eb";
