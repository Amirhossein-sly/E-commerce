import { User, CreditCard, CheckCircle2 } from "lucide-react";

export default function CheckoutStepper({ currentStep }) {
  const steps = [
    { id: 1, name: "Information", icon: User },
    { id: 2, name: "Payment", icon: CreditCard },
    { id: 3, name: "Review", icon: CheckCircle2 },
  ];

  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center gap-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const isUpcoming = currentStep < step.id;

          return (
            <div key={step.id} className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    isCompleted
                      ? "bg-green-600 text-white"
                      : isCurrent
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                  }`}
                >
                  <Icon size={16} />
                </div>
                <span
                  className={`text-sm font-medium ${
                    isCompleted || isCurrent
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-500"
                  }`}
                >
                  {step.name}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`w-8 h-px transition-colors ${
                    isCompleted ? "bg-green-600" : "bg-gray-200 dark:bg-gray-700"
                  }`}
                ></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
