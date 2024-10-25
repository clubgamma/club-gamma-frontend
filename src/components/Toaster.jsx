import { Toaster as Sonner } from 'sonner';

const Toaster = ({ ...props }) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-gradient-to-br group-[.toaster]:from-[#1e1e1e] group-[.toaster]:to-[#4e3535] group-[.toaster]:text-gray-100 group-[.toaster]:border-none group-[.toaster]:shadow-lg group-[.toaster]:rounded-lg",
          description: "group-[.toast]:text-gray-300",
          actionButton: "group-[.toast]:bg-red-500/20 group-[.toast]:text-red-400 group-[.toast]:hover:bg-red-500/30",
          cancelButton: "group-[.toast]:bg-gray-500/20 group-[.toast]:text-gray-400 group-[.toast]:hover:bg-gray-500/30",
          success: "group-[.toaster]:from-[#1e1e1e]/95 group-[.toaster]:to-[#354e35]",
          error: "group-[.toaster]:from-[#1e1e1e]/95 group-[.toaster]:to-[#4e3535]",
          warning: "group-[.toaster]:from-[#1e1e1e]/95 group-[.toaster]:to-[#4e4435]",
          info: "group-[.toaster]:from-[#1e1e1e]/95 group-[.toaster]:to-[#35434e]",
        },
      }}
      {...props}
    />
  );
};

export default Toaster;