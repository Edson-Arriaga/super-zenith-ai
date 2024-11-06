import AppButton from "@/components/ui/AppButton";
import PageTitle from "@/components/ui/PageTitle";

export default function SuccessfulPaymentPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen -mt-28 lg:-mb-10 lg:mt-0 mx-3">
            <PageTitle><span className="animate-pulse">PAGO REALIZADO CORRECTAMENTE</span></PageTitle>
            <AppButton href="/habit-tracker" className="max-w-lg">
                Comienza a usar tu cuenta premium
            </AppButton>
        </div>
    )
}
