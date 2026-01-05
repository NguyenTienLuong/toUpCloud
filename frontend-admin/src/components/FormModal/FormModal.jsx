/* =============================================== */
/*  Location: src/components/FormModal/FormModal.jsx - FIXED */
/* =============================================== */
import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import './FormModal.css';

const FormModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  title,
  icon: Icon,
  data = null,
  fields = []
}) => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const isEdit = !!data;

  // Load dữ liệu khi mở modal
  useEffect(() => {
    if (data && isOpen) {
      const formValues = {};
      fields.forEach(field => {
        formValues[field.name] = data[field.name] || field.defaultValue || '';
      });
      setFormData(formValues);
    } else {
      const initialForm = {};
      fields.forEach(field => {
        initialForm[field.name] = field.defaultValue || '';
      });
      setFormData(initialForm);
    }
    setError('');
  }, [data, isOpen, fields]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Tìm field config
    const field = fields.find(f => f.name === name);
    
    // Nếu là input giá, chỉ cho phép số
    if (field?.inputType === 'number') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    for (const field of fields) {
      // Skip validation cho field disabled
      if (field.disabled) continue;
      
      // Password không bắt buộc khi edit
      if (field.name === 'password' && isEdit && !formData[field.name]) {
        continue;
      }
      
      if (field.required && !formData[field.name]?.toString().trim()) {
        setError(`${field.label} không được để trống`);
        return;
      }
      if (field.inputType === 'number' && parseFloat(formData[field.name]) <= 0) {
        setError(`${field.label} phải lớn hơn 0`);
        return;
      }
      
      // Validate email
      if (field.inputType === 'email' && formData[field.name]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field.name])) {
          setError('Email không hợp lệ');
          return;
        }
      }
    }

    // Transform data
    const submitData = { ...formData };
    fields.forEach(field => {
      if (field.transform) {
        submitData[field.name] = field.transform(formData[field.name]);
      }
    });
    
    // Không gửi password nếu là edit và password rỗng
    if (isEdit && !submitData.password) {
      delete submitData.password;
    }

    onSubmit(submitData);
    setError('');
  };

  const handleClose = () => {
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modern-modal-overlay" onClick={handleClose}>
      <div className="modern-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modern-modal-header">
          <div className="header-icon">
            {Icon && <Icon size={24} style={{ color: '#7c2d12', strokeWidth: 2 }} />}
          </div>
          <div className="header-text">
            <h2>{isEdit ? title.edit : title.add}</h2>
            <p>{isEdit ? title.editDesc : title.addDesc}</p>
          </div>
          <button 
            className="modern-close-btn" 
            onClick={handleClose}
            title="Đóng"
          >
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiX size={20} />
            </span>
          </button>
        </div>

        {/* Form */}
        <form className="modern-form" onSubmit={handleSubmit}>
          {error && (
            <div className="modern-error">{error}</div>
          )}

          <div className="form-grid">
            {fields.map((field) => {
              const FieldIcon = field.icon;
              const isDisabled = field.disabled || false;
              
              return (
                <div 
                  key={field.name}
                  className={`modern-form-group ${field.fullWidth ? 'full-width' : ''}`}
                >
                  <label>
                    {field.label}
                    {field.required && field.name !== 'password' && <span className="required-star">*</span>}
                    {field.required && field.name === 'password' && !isEdit && <span className="required-star">*</span>}
                  </label>
                  
                  <div className="input-wrapper">
                    {FieldIcon && (
                      <span className={`input-icon ${field.type === 'textarea' ? 'textarea-icon' : ''}`}>
                        <FieldIcon size={18} style={{ color: '#9ca3af' }} />
                      </span>
                    )}
                    
                    {field.type === 'select' ? (
                      <select
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        required={field.required && !isEdit}
                        disabled={isDisabled}
                      >
                        {field.options?.map(opt => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : field.type === 'textarea' ? (
                      <textarea
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        rows={field.rows || 4}
                        disabled={isDisabled}
                      />
                    ) : field.type === 'password' ? (
                      <input
                        type="password"
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required={field.required && !isEdit}
                        disabled={isDisabled}
                      />
                    ) : (
                      <input
                        type={field.inputType === 'number' ? 'text' : field.inputType || 'text'}
                        inputMode={field.inputType === 'number' ? 'numeric' : undefined}
                        pattern={field.inputType === 'number' ? '[0-9]*' : undefined}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required={field.required && !isEdit}
                        disabled={isDisabled}
                      />
                    )}
                  </div>
                  
                  <span className="field-helper">
                    {field.helperText || '\u00A0'}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="modern-form-actions">
            <button type="button" className="modern-btn modern-btn-cancel" onClick={handleClose}>
              Hủy
            </button>
            <button type="submit" className="modern-btn modern-btn-submit">
              {Icon && <Icon />}
              {isEdit ? 'Cập nhật' : 'Thêm mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;