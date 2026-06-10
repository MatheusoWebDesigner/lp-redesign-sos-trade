/* =====================================================================
   S.O.S Trader — Captura Dinâmica, Animações e Validações
   - Transições de passos e validações de formulário (CPF real + telefone com DDD).
   - Animações de entrada e scroll via GSAP e ScrollTrigger.
   - Atualização automática de relógio local e barra de progresso de leitura.
   - Rolagem suave (smooth scroll) para todos os botões de ação (CTAs).
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // Elementos do formulário
  const form = document.getElementById('leadForm');
  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const successState = document.getElementById('formSuccess');
  const progressFill = document.getElementById('progressFill');
  const progressLabel = document.getElementById('progressLabel');
  
  const faixa = document.getElementById('faixa');
  const nome = document.getElementById('nome');
  const email = document.getElementById('email');
  const telefone = document.getElementById('telefone');
  const cpf = document.getElementById('cpf');

  // Elementos da Navbar e Status
  const navbar = document.getElementById('navbar');
  const readingProgress = document.getElementById('readingProgress');
  const localTimeSpan = document.getElementById('localTime');

  /* ===================== RELÓGIO EM TEMPO REAL ===================== */
  function updateLocalClock() {
    if (localTimeSpan) {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      localTimeSpan.textContent = `${hrs}:${mins}`;
    }
  }
  updateLocalClock();
  setInterval(updateLocalClock, 30000); // Atualiza a cada 30 segundos

  /* ===================== ROLAGEM E LEITURA (NAVBAR) ===================== */
  window.addEventListener('scroll', () => {
    // Adiciona classe de rolagem na Nav
    if (window.scrollY > 40) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }

    // Calcula barra de leitura
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    if (readingProgress) {
      readingProgress.style.width = scrolled + '%';
    }
  });

  /* ===================== SMOOTH SCROLL PARA CTAS ===================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Se for rolar para o card do formulário, pisca a borda para chamar atenção
        if (targetId === '#leadFormCard') {
          const card = document.querySelector('.form-card');
          if (card) {
            card.style.borderColor = 'var(--accent-lime)';
            setTimeout(() => {
              card.style.borderColor = '';
            }, 1500);
          }
        }
        
        // Rolagem suave levando em conta o offset da nav flutuante (64px + 24px margem)
        const offset = 90;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = targetElement.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ===================== TRANSIÇÃO E CONTROLE DO FORMULÁRIO ===================== */
  function goStep(n) {
    if (n === 1) {
      step2.classList.add('is-hidden');
      step1.classList.remove('is-hidden');
      progressFill.style.width = '50%';
      progressLabel.textContent = 'Passo 1 de 2 — Seu momento';
      faixa.focus();
    } else if (n === 2) {
      step1.classList.add('is-hidden');
      step2.classList.remove('is-hidden');
      progressFill.style.width = '90%';
      progressLabel.textContent = 'Passo 2 de 2 — Conclusão de acesso';
      nome.focus();
    }
  }

  // Avançar para o Passo 2
  document.getElementById('btnNextStep').addEventListener('click', () => {
    if (!faixa.value) {
      faixa.style.borderColor = 'var(--color-danger)';
      faixa.style.boxShadow = '0 0 0 4px rgba(224, 88, 77, 0.12)';
      setTimeout(() => {
        faixa.style.borderColor = '';
        faixa.style.boxShadow = '';
      }, 1500);
      return;
    }
    goStep(2);
  });

  // Voltar para o Passo 1
  document.getElementById('btnPrevStep').addEventListener('click', () => {
    goStep(1);
  });

  /* ===================== MÁSCARAS DE ENTRADA ===================== */
  telefone.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 11);
    if (val.length > 6) {
      val = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`;
    } else if (val.length > 2) {
      val = `(${val.slice(0, 2)}) ${val.slice(2)}`;
    } else if (val.length > 0) {
      val = `(${val}`;
    }
    e.target.value = val;
  });

  cpf.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 11);
    val = val
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    e.target.value = val;
  });

  /* ===================== REGRAS DE VALIDAÇÃO ===================== */
  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val.trim());
  }

  function isValidPhone(val) {
    return val.replace(/\D/g, '').length === 11;
  }

  function isValidCPF(val) {
    const raw = val.replace(/\D/g, '');
    if (raw.length !== 11 || /^(\d)\1{10}$/.test(raw)) return false;
    
    // Validação matemática do primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(raw[i]) * (10 - i);
    }
    let d1 = (sum * 10) % 11;
    if (d1 === 10) d1 = 0;
    if (d1 !== parseInt(raw[9])) return false;

    // Validação matemática do segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(raw[i]) * (11 - i);
    }
    let d2 = (sum * 10) % 11;
    if (d2 === 10) d2 = 0;
    return d2 === parseInt(raw[10]);
  }

  const fieldRules = {
    nome: { 
      test: (val) => val.trim().split(' ').filter(n => n.length > 0).length >= 2, 
      msg: 'Por favor, digite seu nome e sobrenome completo.' 
    },
    email: { 
      test: isValidEmail, 
      msg: 'Por favor, insira um e-mail válido.' 
    },
    telefone: { 
      test: isValidPhone, 
      msg: 'Insira o telefone completo com o DDD (11 dígitos).' 
    },
    cpf: { 
      test: isValidCPF, 
      msg: 'Este CPF parece inválido. Por favor, confira os números.' 
    }
  };

  function validateField(element) {
    const rule = fieldRules[element.id];
    if (!rule) return true;

    const val = element.value;
    const ok = rule.test(val);
    const errorSpan = form.querySelector(`.error-msg[data-for="${element.id}"]`);

    element.classList.toggle('is-valid', ok && val !== '');
    element.classList.toggle('is-invalid', !ok && val !== '');

    if (errorSpan) {
      errorSpan.textContent = ok ? '' : rule.msg;
      errorSpan.classList.toggle('show', !ok && val !== '');
    }

    return ok;
  }

  /* ===================== HABILITAR/DESABILITAR BOTÃO SUBMIT ===================== */
  const submitBtn = document.getElementById('btnSubmitForm');

  function checkFormValidity() {
    const isFaixaOk = !!faixa.value;
    const isNomeOk = fieldRules.nome.test(nome.value);
    const isEmailOk = fieldRules.email.test(email.value);
    const isTelefoneOk = fieldRules.telefone.test(telefone.value);
    const isCpfOk = fieldRules.cpf.test(cpf.value);

    const allOk = isFaixaOk && isNomeOk && isEmailOk && isTelefoneOk && isCpfOk;
    if (submitBtn) {
      submitBtn.disabled = !allOk;
    }
  }

  // Executa uma vez no início
  checkFormValidity();

  // Escuta blur e input dinâmico após erro
  [nome, email, telefone, cpf].forEach((el) => {
    el.addEventListener('blur', () => {
      validateField(el);
      checkFormValidity();
    });
    el.addEventListener('input', () => {
      if (el.classList.contains('is-invalid')) {
        validateField(el);
      }
      checkFormValidity();
    });
  });

  faixa.addEventListener('change', checkFormValidity);

  /* ===================== ENVIO DO FORMULÁRIO (SUBMIT) ===================== */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const fieldsToValidate = [nome, email, telefone, cpf];
    let formIsValid = true;

    fieldsToValidate.forEach((el) => {
      if (!validateField(el)) {
        formIsValid = false;
      }
    });

    if (!formIsValid) {
      // Foca no primeiro campo com erro
      form.querySelector('.is-invalid')?.focus();
      return;
    }

    // Fluxo de Sucesso simulado
    step2.classList.add('is-hidden');
    successState.classList.remove('is-hidden');
    progressFill.style.width = '100%';
    progressLabel.textContent = 'Inscrição Ativada!';
    
    // Rola de volta para o topo do card de forma suave para ver o feedback
    const cardRect = form.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: cardRect - 120,
      behavior: 'smooth'
    });
  });

  /* ===================== ANIMAÇÕES PREMIUM CINEMATOGRÁFICAS (GSAP) ===================== */
  if (typeof gsap !== 'undefined') {
    // Registra o plugin de scroll
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Entrada dos Elementos do Hero (Acima da Dobra)
      gsap.from('#heroLogo', {
        scale: 0.90,
        opacity: 0,
        duration: 1.2,
        ease: 'elastic.out(1, 0.75)',
        delay: 0.2
      });

      // Efeito de revelação cinética no título do Hero
      gsap.from('#heroTitle .danger-highlight', {
        y: 40,
        opacity: 0,
        duration: 1.0,
        ease: 'power4.out',
        delay: 0.35
      });

      gsap.from('#heroTitle .lime-highlight', {
        y: 40,
        opacity: 0,
        duration: 1.0,
        ease: 'power4.out',
        delay: 0.45
      });

      gsap.from('.hero-subtitle', {
        y: 24,
        opacity: 0,
        duration: 1.0,
        ease: 'power3.out',
        delay: 0.55
      });

      gsap.from('.hero-actions-row, .hero-mini-social', {
        y: 20,
        opacity: 0,
        duration: 1.0,
        ease: 'power3.out',
        delay: 0.65
      });

      // Formulário de captura com entrada elástica tátil de app nativo
      gsap.from('#leadFormCard', {
        x: 35,
        opacity: 0,
        duration: 1.2,
        ease: 'back.out(1.2)',
        delay: 0.45
      });

      // 2. Animação da Seção do Problema (ScrollTrigger)
      gsap.from('.editorial-main-text > *', {
        scrollTrigger: {
          trigger: '.editorial-problem-section',
          start: 'top 88%',
          toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        duration: 1.0,
        stagger: 0.12,
        ease: 'power4.out'
      });

      gsap.utils.toArray('.editorial-flow-list .editorial-flow-item').forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none'
          },
          y: 28,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        });
      });

      gsap.utils.toArray('.problem-gallery-showcase .problem-gallery-item').forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 92%',
            toggleActions: 'play none none none'
          },
          y: 32,
          opacity: 0,
          duration: 0.9,
          ease: 'back.out(1.1)'
        });
      });

      // 3. Animação Tech Grid de Benefícios (ScrollTrigger)
      gsap.from('.benefits-section .section-header > *', {
        scrollTrigger: {
          trigger: '.benefits-section',
          start: 'top 88%'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power4.out'
      });

      // Células de benefício entram com efeito elástico premium
      gsap.utils.toArray('.tech-grid .tech-grid-cell').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 92%',
            toggleActions: 'play none none none'
          },
          y: 36,
          opacity: 0,
          duration: 0.9,
          ease: 'back.out(1.25)',
          delay: i * 0.05
        });
      });

      // 4. Animação de Prova Prática (ScrollTrigger)
      gsap.from('.testimonials-section .section-header > *', {
        scrollTrigger: {
          trigger: '.testimonials-section',
          start: 'top 88%'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power4.out'
      });

      // Cards de depoimentos recortados WebP com entrada elástica sutil em cascata
      gsap.from('.results-terminal-grid .terminal-screenshot-card', {
        scrollTrigger: {
          trigger: '.results-terminal-grid',
          start: 'top 90%'
        },
        y: 40,
        opacity: 0,
        duration: 1.1,
        stagger: 0.1,
        ease: 'back.out(1.15)'
      });
    });

    // Reverte e limpa no encerramento (limpeza de memória de GSAP)
    window.addEventListener('beforeunload', () => {
      ctx.revert();
    });
  }

});
