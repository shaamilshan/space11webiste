const ADMIN_TOKEN_KEY = 'space11_admin_token';

export function getStoredAdminToken() {
  try {
    return localStorage.getItem(ADMIN_TOKEN_KEY) || '';
  } catch {
    return '';
  }
}

export function setStoredAdminToken(token) {
  try {
    localStorage.setItem(ADMIN_TOKEN_KEY, token);
  } catch {
    // Ignore storage quota errors
  }
}

export function clearStoredAdminToken() {
  try {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
  } catch {
    // Ignore storage errors
  }
}

async function apiRequest(path, options = {}) {
  const { auth = false, headers = {}, body, ...rest } = options;
  const requestHeaders = { ...headers };

  if (auth) {
    const token = getStoredAdminToken();
    if (token) {
      requestHeaders.Authorization = `Bearer ${token}`;
    }
  }

  if (body && !(body instanceof FormData) && !requestHeaders['Content-Type']) {
    requestHeaders['Content-Type'] = 'application/json';
  }

  const response = await fetch(path, {
    ...rest,
    headers: requestHeaders,
    body: body && !(body instanceof FormData) && typeof body !== 'string' ? JSON.stringify(body) : body
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const fallback =
      response.status >= 502
        ? 'API server is unavailable. Make sure the backend server is running.'
        : `Request failed (${response.status})`;
    const error = new Error(data.error || fallback);
    error.status = response.status;
    throw error;
  }

  return data;
}

export function fetchSiteContent() {
  return apiRequest('/api/content');
}

export async function loginAdmin(password) {
  const data = await apiRequest('/api/admin/login', {
    method: 'POST',
    body: { password }
  });
  if (data.token) {
    setStoredAdminToken(data.token);
  }
  return data;
}

export async function logoutAdmin() {
  try {
    await apiRequest('/api/admin/logout', { method: 'POST', auth: true });
  } finally {
    clearStoredAdminToken();
  }
}

export function checkAdminSession() {
  return apiRequest('/api/admin/session', { auth: true });
}

export function uploadAdminImage(file) {
  const formData = new FormData();
  formData.append('image', file);
  return apiRequest('/api/upload', {
    method: 'POST',
    auth: true,
    body: formData
  });
}

export function createGalleryItem(payload) {
  return apiRequest('/api/gallery', { method: 'POST', auth: true, body: payload });
}

export function updateGalleryItem(id, payload) {
  return apiRequest(`/api/gallery/${encodeURIComponent(id)}`, {
    method: 'PUT',
    auth: true,
    body: payload
  });
}

export function deleteGalleryItem(id) {
  return apiRequest(`/api/gallery/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    auth: true
  });
}

export function createTestimonial(payload) {
  return apiRequest('/api/testimonials', { method: 'POST', auth: true, body: payload });
}

export function updateTestimonial(id, payload) {
  return apiRequest(`/api/testimonials/${encodeURIComponent(id)}`, {
    method: 'PUT',
    auth: true,
    body: payload
  });
}

export function deleteTestimonial(id) {
  return apiRequest(`/api/testimonials/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    auth: true
  });
}
