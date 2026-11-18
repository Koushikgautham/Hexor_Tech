import { CreditCard } from "lucide-react";

export const BillingInvoicingAndPaymentTerms = {
  id: 8,
  icon: CreditCard,
  title: "Billing, Invoicing, and Payment Terms",
  content: (
    <>
      <p className="text-gray-400 leading-relaxed mb-4">
        Our billing and payment terms are as follows:
      </p>
      <ul className="space-y-3">
        <li className="text-gray-400">
          <span className="text-white font-semibold">Invoicing System:</span> Clients can view and track invoices through the client dashboard, including amounts, due dates, and payment status.
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Payment Terms:</span> Payment is due according to the terms specified in each invoice, typically within 15-30 days of invoice date.
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Late Payments:</span> Overdue invoices may incur late fees and may result in suspension of services until payment is received.
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Payment Processing:</span> We do not process payments directly through the Platform. Payment instructions will be provided on each invoice.
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Disputed Charges:</span> Any billing disputes must be raised within 15 days of invoice date.
        </li>
        <li className="text-gray-400">
          <span className="text-white font-semibold">Refund Policy:</span> Refunds are evaluated on a case-by-case basis and depend on project stage and work completed.
        </li>
      </ul>
    </>
  ),
};
