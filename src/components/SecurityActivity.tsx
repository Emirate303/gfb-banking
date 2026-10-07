import { useMemo } from "react";
import { useBanking } from "../BankingContext";
import { useNotifications } from "../NotificationContext";

function SecurityActivity() {
  const { transactions } = useBanking();
  const { notifications } = useNotifications();

  const activity = useMemo(() => {
    const transactionActivity = transactions
      .slice(0, 8)
      .map((transaction) => ({
        id: `transaction-${transaction.id}`,
        title:
          transaction.amount < 0
            ? "Payment or transfer"
            : "Money received",
        description:
          transaction.description ||
          transaction.merchant ||
          "Account activity",
        date: transaction.date,
        type:
          transaction.amount < 0
            ? "payment"
            : "deposit",
      }));

    const notificationActivity =
      notifications.slice(0, 8).map(
        (notification) => ({
          id: `notification-${notification.id}`,
          title: notification.title,
          description:
            notification.message,
          date: notification.date,
          type: notification.type,
        })
      );

    return [
      ...notificationActivity,
      ...transactionActivity,
    ].slice(0, 12);
  }, [transactions, notifications]);

  return (
    <section className="security-activity-section">

      <div className="security-activity-header">

        <div>
          <span className="settings-section-eyebrow">
            SECURITY & ACTIVITY
          </span>

          <h2>
            Recent account activity
          </h2>

          <p>
            Review important account events,
            payments, transfers, and security
            notifications.
          </p>
        </div>

        <div className="security-status">
          <span className="security-status-dot" />
          Account protected
        </div>

      </div>


      <div className="security-activity-list">

        {activity.length === 0 ? (

          <div className="security-activity-empty">

            <div className="security-empty-icon">
              ✓
            </div>

            <strong>
              No recent activity
            </strong>

            <p>
              Important account activity will
              appear here as you use GFB.
            </p>

          </div>

        ) : (

          activity.map((item) => (

            <div
              className="security-activity-item"
              key={item.id}
            >

              <div
                className={`security-activity-icon ${item.type}`}
              >
                {item.type === "security"
                  ? "◆"
                  : item.type === "warning"
                    ? "!"
                    : item.type === "deposit"
                      ? "+"
                      : "✓"}
              </div>

              <div className="security-activity-content">

                <strong>
                  {item.title}
                </strong>

                <p>
                  {item.description}
                </p>

                <small>
                  {item.date}
                </small>

              </div>

              <span className="security-activity-arrow">
                →
              </span>

            </div>

          ))

        )}

      </div>

    </section>
  );
}

export default SecurityActivity;