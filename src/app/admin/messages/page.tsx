"use client";

import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  Search,
  Mail,
  Clock,
  Trash2,
  MailOpen,
} from "lucide-react";

interface MessageItem {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterRead, setFilterRead] = useState<"all" | "unread" | "read">("all");
  const [selectedMessage, setSelectedMessage] = useState<MessageItem | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/admin/messages");
      const json = await res.json();
      if (json.success && json.messages) {
        setMessages(json.messages);
      }
    } catch (err) {
      console.error("Failed to load messages:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRead = async (id: string, isRead: boolean) => {
    try {
      const res = await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isRead }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setMessages(json.messages);
        if (selectedMessage?.id === id) {
          setSelectedMessage({ ...selectedMessage, isRead });
        }
      }
    } catch (err) {
      console.error("Failed to toggle read status:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/messages?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setMessages(json.messages);
        if (selectedMessage?.id === id) {
          setSelectedMessage(null);
        }
      }
    } catch (err) {
      console.error("Failed to delete message:", err);
    }
  };

  const filteredMessages = messages.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.message.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filterRead === "all" ||
      (filterRead === "unread" && !m.isRead) ||
      (filterRead === "read" && m.isRead);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#F2F2EE] tracking-tight">
          Inbound Contact Inquiries
        </h1>
        <p className="text-xs text-[#92969F] mt-1 font-mono">
          Review, respond, and organize visitor submissions ({messages.length} total).
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#656B75]" />
          <input
            type="text"
            placeholder="Search by sender or message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#101216] text-[#F2F2EE] text-xs border border-[#252A32] focus:outline-none focus:border-[#D4F933] font-mono font-medium shadow-xs"
          />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto font-mono text-xs">
          {(["all", "unread", "read"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setFilterRead(filter)}
              className={`px-3.5 py-1.5 rounded-xl uppercase tracking-wider text-[11px] font-semibold transition-all ${
                filterRead === filter
                  ? "bg-[#D4F933] text-black font-bold shadow-sm shadow-[#D4F933]/25"
                  : "bg-[#101216] text-[#92969F] border border-[#252A32] hover:text-[#F2F2EE] hover:border-[#D4F933]/50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-2 space-y-3">
          {loading ? (
            <div className="p-8 text-center text-xs text-[#656B75] font-mono animate-pulse">
              LOADING INBOX...
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#656B75] font-mono bg-[#101216] rounded-2xl border border-[#252A32]">
              No messages found matching criteria.
            </div>
          ) : (
            filteredMessages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => {
                  setSelectedMessage(msg);
                  if (!msg.isRead) handleToggleRead(msg.id, true);
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedMessage?.id === msg.id
                    ? "bg-[#1F242D] border-[#D4F933] shadow-xs"
                    : msg.isRead
                    ? "bg-[#101216]/80 border-[#252A32] hover:border-[#656B75] text-[#92969F]"
                    : "bg-[#101216] border-[#D4F933]/50 hover:border-[#D4F933] text-[#F2F2EE] shadow-2xs"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    {!msg.isRead && (
                      <span className="w-2 h-2 rounded-full bg-[#D4F933] shrink-0" />
                    )}
                    <span className="text-xs font-bold text-[#F2F2EE] line-clamp-1">
                      {msg.name}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#656B75] font-mono shrink-0">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {msg.subject && (
                  <h4 className="text-xs font-semibold text-[#D4F933] line-clamp-1 mb-1">
                    {msg.subject}
                  </h4>
                )}

                <p className="text-xs text-[#92969F] line-clamp-2 leading-relaxed">
                  {msg.message}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Selected Message Detail View */}
        <div className="lg:col-span-3">
          {selectedMessage ? (
            <div className="p-6 sm:p-8 rounded-2xl bg-[#101216] border border-[#252A32] space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#252A32]">
                <div>
                  <h2 className="text-lg font-bold text-[#F2F2EE] tracking-tight">
                    {selectedMessage.subject || "Contact Form Inquiry"}
                  </h2>
                  <div className="flex items-center gap-2 text-xs text-[#92969F] mt-1 font-mono">
                    <span>From: <strong className="text-[#F2F2EE]">{selectedMessage.name}</strong></span>
                    <span>•</span>
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="text-[#D4F933] hover:underline font-semibold"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    onClick={() =>
                      handleToggleRead(selectedMessage.id, !selectedMessage.isRead)
                    }
                    className="p-2 rounded-xl bg-[#161A20] border border-[#252A32] text-[#92969F] hover:text-[#D4F933] hover:border-[#D4F933]/40 transition-colors"
                    title={selectedMessage.isRead ? "Mark as unread" : "Mark as read"}
                  >
                    {selectedMessage.isRead ? <Mail size={15} /> : <MailOpen size={15} />}
                  </button>

                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="p-2 rounded-xl bg-red-950/30 border border-red-800/40 text-red-400 hover:bg-red-950/60 transition-colors"
                    title="Delete Message"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              <div className="text-xs text-[#656B75] font-mono flex items-center gap-1.5">
                <Clock size={12} className="text-[#D4F933]" />
                <span>
                  Received: {new Date(selectedMessage.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="p-5 rounded-xl bg-[#161A20] border border-[#252A32] text-sm text-[#F2F2EE] leading-relaxed whitespace-pre-wrap font-sans">
                {selectedMessage.message}
              </div>

              <div className="pt-2">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                    selectedMessage.subject || "Portfolio Inquiry"
                  )}`}
                  className="lime-btn text-xs inline-flex items-center gap-2"
                >
                  <Mail size={13} />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="h-64 sm:h-96 rounded-2xl bg-[#101216] border border-[#252A32] flex flex-col items-center justify-center text-center p-6 text-[#656B75] text-xs font-mono shadow-2xs">
              <MessageSquare size={32} className="text-[#252A32] mb-3" />
              <span>Select an inquiry from the left to read full message.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
