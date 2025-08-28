
document.addEventListener('DOMContentLoaded', () => {
    const emailEl = document.getElementById('email');
    const passwordEl = document.getElementById('password');
    const acceptEl = document.getElementById('accept'); // pode ser null
    const loginBtn = document.getElementById('loginBtn');

    function validateEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = emailEl.value.trim();
        const password = passwordEl.value;
        const remember = acceptEl ? acceptEl.checked : false;

        if (!email || !password) {
            alert('Preencha e-mail e senha.');
            return;
        }

        if (!validateEmail(email)) {
            alert('Digite um e-mail válido.');
            return;
        }

        console.log({ email, password, remember });
        alert(`Dados recebidos:\nE-mail: ${email}\nSenha: ${'*'.repeat(Math.min(8, password.length))}\nSalvar: ${remember}`);

        if (remember) {
            try {
                localStorage.setItem('savedEmail', email);
            } catch (err) {
                console.warn('Não foi possível salvar no localStorage:', err);
            }
        } else {
            localStorage.removeItem('savedEmail');
        }
    });

    try {
        const saved = localStorage.getItem('savedEmail');
        if (saved && emailEl) emailEl.value = saved;
    } catch (err) {
    }
});
