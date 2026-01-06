const cx = (...classes) => classes.filter(Boolean).join(" ");

const VARIANTS = {
  primary: "badge--primary",
  secondary: "badge--secondary",
  success: "badge--success",
  warning: "badge--warning",
  error: "badge--error",
};

const SIZES = {
  sm: "px-2 py-1 text-[11px]",};

export default function Badge({
  children,
  variant = "primary",
  size,
  className = "",
  // eslint-disable-next-line no-unused-vars
  as: Component = "span",
  ...props
}) {
  return (
    <Component
      className={cx("badge", VARIANTS[variant], SIZES[size], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
