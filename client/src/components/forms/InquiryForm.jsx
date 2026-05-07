import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showToast } from '../../store/uiSlice.js';
import api from '../../api/axiosInstance.js';

// Feature: hanuvansh-mern-estate
// InquiryForm: contact/inquiry form with validation and Redux toast feedback.
// Requirements: 13.6, 13.7

const INITIAL_STATE = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

const INPUT_CLASS =
  'w-full bg-bg-secondary border border-white/10 rounded-lg px-4 py-3 text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-accent transition-colors';
const LABEL_CLASS = 'block text-text-muted text-xs font-medium mb-1';

/**
 * @param {{ propertyId?: string }} props
 */
export default function InquiryForm({ propertyId }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\+?[\d\s\-()]{7,15}$/.test(form.phone)) {
      newErrors.phone = 'Enter a valid phone number.';
    }
    if (!form.message.trim()) newErrors.message = 'Message is required.';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const payload = { ...form };
      if (propertyId) payload.propertyId = propertyId;

      await api.post('/inquiries', payload);

      setSuccess(true);
      setForm(INITIAL_STATE);
      setErrors({});
    } catch (err) {
      const message =
        err.response?.data?.message || 'Failed to send inquiry. Please try again.';
      dispatch(showToast({ toastMessage: message, toastType: 'error' }));
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-bg-card border border-green-600/40 rounded-xl p-6 text-center">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="text-text-primary font-heading font-semibold text-lg mb-2">
          Inquiry Sent!
        </h3>
        <p className="text-text-muted text-sm mb-4">
          Thank you for reaching out. Our team will contact you shortly.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="text-accent text-sm hover:underline"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-bg-card border border-white/10 rounded-xl p-6 space-y-4"
    >
      <h3 className="text-text-primary font-heading font-semibold text-lg">
        Send an Inquiry
      </h3>

      {/* Name */}
      <div>
        <label htmlFor="inquiry-name" className={LABEL_CLASS}>
          Full Name <span className="text-accent">*</span>
        </label>
        <input
          id="inquiry-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your full name"
          value={form.name}
          onChange={handleChange}
          className={INPUT_CLASS}
          aria-describedby={errors.name ? 'inquiry-name-error' : undefined}
        />
        {errors.name && (
          <p id="inquiry-name-error" className="text-red-400 text-xs mt-1">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="inquiry-email" className={LABEL_CLASS}>
          Email Address <span className="text-accent">*</span>
        </label>
        <input
          id="inquiry-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          className={INPUT_CLASS}
          aria-describedby={errors.email ? 'inquiry-email-error' : undefined}
        />
        {errors.email && (
          <p id="inquiry-email-error" className="text-red-400 text-xs mt-1">
            {errors.email}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="inquiry-phone" className={LABEL_CLASS}>
          Phone Number <span className="text-accent">*</span>
        </label>
        <input
          id="inquiry-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+91 98765 43210"
          value={form.phone}
          onChange={handleChange}
          className={INPUT_CLASS}
          aria-describedby={errors.phone ? 'inquiry-phone-error' : undefined}
        />
        {errors.phone && (
          <p id="inquiry-phone-error" className="text-red-400 text-xs mt-1">
            {errors.phone}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="inquiry-message" className={LABEL_CLASS}>
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="inquiry-message"
          name="message"
          rows={4}
          placeholder="Tell us about your requirements..."
          value={form.message}
          onChange={handleChange}
          className={`${INPUT_CLASS} resize-none`}
          aria-describedby={errors.message ? 'inquiry-message-error' : undefined}
        />
        {errors.message && (
          <p id="inquiry-message-error" className="text-red-400 text-xs mt-1">
            {errors.message}
          </p>
        )}
      </div>

      {/* Hidden propertyId — not rendered but included in payload */}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-accent hover:bg-accent-light disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors duration-200"
      >
        {loading ? 'Sending…' : 'Send Inquiry'}
      </button>
    </form>
  );
}
