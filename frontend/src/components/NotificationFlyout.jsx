import { UserCheck, Calendar, FileText, AlertTriangle, Clock, Activity, CheckCheck } from 'lucide-react'

export default function NotificationFlyout({
  notifications = [],
  isOpen,
  onClose,
  onMarkAllRead,
  onNotificationClick,
  t
}) {
  if (!isOpen) return null

  const unreadCount = notifications.filter((n) => !n.read).length

  const getIcon = (type) => {
    switch (type) {
      case 'patient':
        return <UserCheck size={16} className="text-[#0c9d91]" />
      case 'calendar':
        return <Calendar size={16} className="text-blue-600" />
      case 'lab':
        return <FileText size={16} className="text-amber-600" />
      case 'alert':
        return <AlertTriangle size={16} className="text-rose-600" />
      default:
        return <Activity size={16} className="text-[#0c9d91]" />
    }
  }

  const getBg = (type) => {
    switch (type) {
      case 'patient':
        return 'bg-[#dff5f1] border-emerald-200'
      case 'calendar':
        return 'bg-blue-100/70 border-blue-200'
      case 'lab':
        return 'bg-amber-100/70 border-amber-200'
      case 'alert':
        return 'bg-rose-100/70 border-rose-200'
      default:
        return 'bg-[#dff5f1] border-emerald-200'
    }
  }

  return (
    <div className="absolute right-0 top-full mt-2 w-[340px] sm:w-[380px] bg-white rounded-3xl shadow-2xl border border-slate-100 ring-1 ring-black/5 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
      {/* Top Header matching reference image */}
      <div className="bg-[#dff5f1]/60 border-b border-emerald-200/60 px-4 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#08283a] text-sm">{t('notifications')}</span>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#0c9d91] text-white shadow-xs">
              {unreadCount} {t('newNotifications')}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            type="button"
            onClick={onMarkAllRead}
            className="text-[11px] font-semibold text-[#087e78] hover:text-[#0c9d91] flex items-center gap-1 transition-colors"
          >
            <CheckCheck size={13} />
            <span>{t('markAllRead') || 'Mark all read'}</span>
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="divide-y divide-slate-100 max-h-[380px] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            {t('noNotifications') || 'No notifications at this time.'}
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (onNotificationClick) onNotificationClick(item)
              }}
              className={`p-3.5 flex items-start gap-3 hover:bg-emerald-50/50 transition-colors cursor-pointer relative group ${
                !item.read ? 'bg-emerald-50/25' : ''
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 border ${getBg(
                  item.type
                )} group-hover:scale-105 transition-transform`}
              >
                {getIcon(item.type)}
              </div>

              <div className="flex-1 min-w-0 pr-2">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <h4 className="text-xs font-bold text-[#08283a] truncate group-hover:text-[#0c9d91] transition-colors">
                    {item.titleKey ? (t(item.titleKey) || item.title) : item.title}
                  </h4>
                  {!item.read && (
                    <span className="w-2 h-2 rounded-full bg-[#0c9d91] flex-shrink-0" />
                  )}
                </div>
                <p className="text-[11px] text-slate-500 leading-snug line-clamp-2">
                  {item.messageKey ? (t(item.messageKey) || item.message) : item.message}
                </p>
                <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400 font-medium">
                  <div className="flex items-center gap-1">
                    <Clock size={11} />
                    <span>{item.timeKey ? (t(item.timeKey) || item.time) : item.time}</span>
                  </div>
                  <span className="text-[#0c9d91] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    {t('clickToView') || 'Click to view →'}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bottom Footer link matching reference */}
      <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
        <button
          type="button"
          onClick={onClose}
          className="text-xs font-semibold text-[#087e78] hover:text-[#0c9d91] transition-colors"
        >
          {t('viewAllNotifications')}
        </button>
      </div>
    </div>
  )
}
