        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
        
        // Mobile menu toggle
        function toggleMobileMenu() {
            // Implementation for mobile menu
        }
        
        // FAQ Accordion
        function toggleFAQ(index) {
            const faqs = document.querySelectorAll('.faq-content');
            const icons = document.querySelectorAll('.faq-icon');
            
            faqs[index].classList.toggle('hidden');
            icons[index].classList.toggle('rotate-180');
        }
        
        // Testimonial Slider
        let currentTestimonial = 0;
        const testimonialSlider = document.getElementById('testimonialSlider');
        const testimonialDots = document.querySelectorAll('.testimonial-dot');
        
        function changeTestimonial(index) {
            currentTestimonial = index;
            testimonialSlider.style.transform = `translateX(-${index * 100}%)`;
            
            testimonialDots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('bg-[var(--color-primary)]');
                    dot.classList.remove('bg-gray-300');
                } else {
                    dot.classList.remove('bg-[var(--color-primary)]');
                    dot.classList.add('bg-gray-300');
                }
            });
        }
        
        // Auto-rotate testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % 3;
            changeTestimonial(currentTestimonial);
        }, 5000);
        
        // Network visualization
        const canvas = document.getElementById('network-canvas');
        const ctx = canvas.getContext('2d');
        const agentNodesContainer = document.getElementById('agent-nodes');
        const agentInfo = document.getElementById('agent-info');
        
        function resizeCanvas() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Agent data with enhanced properties
        const agents = [
            { 
                name: 'James', 
                role: 'Researcher',
                x: 0.5, 
                y: 0.12, 
                color: '#00FF88',
                pulseColor: '#00FFB3',
                description: 'Finds and validates prospect data',
                icon: '🔍',
                rotation: 0,
                orbitRadius: 200,
                orbitSpeed: 0.02
            },
            { 
                name: 'Alex', 
                role: 'Cold Caller',
                x: 0.88, 
                y: 0.35, 
                color: '#00FFB3',
                pulseColor: '#00FFDD',
                description: 'Qualifies leads and books meetings',
                icon: '📞',
                rotation: 60,
                orbitRadius: 200,
                orbitSpeed: 0.018
            },
            { 
                name: 'Maya', 
                role: 'Inbound Sales',
                x: 0.88, 
                y: 0.65, 
                color: '#00FF88',
                pulseColor: '#00FFB3',
                description: 'Handles incoming inquiries',
                icon: '💬',
                rotation: 120,
                orbitRadius: 200,
                orbitSpeed: 0.022
            },
            { 
                name: 'Ian', 
                role: 'Data Engineer',
                x: 0.5, 
                y: 0.88, 
                color: '#00FFB3',
                pulseColor: '#00FFDD',
                description: 'Processes and analyzes data',
                icon: '📊',
                rotation: 180,
                orbitRadius: 200,
                orbitSpeed: 0.019
            },
            { 
                name: 'Tiffany', 
                role: 'Customer Service',
                x: 0.12, 
                y: 0.65, 
                color: '#00FF88',
                pulseColor: '#00FFB3',
                description: 'Provides 24/7 support',
                icon: '🎧',
                rotation: 240,
                orbitRadius: 200,
                orbitSpeed: 0.021
            },
            { 
                name: 'Oscar', 
                role: 'Business Relationships Manager',
                x: 0.12, 
                y: 0.35, 
                color: '#00FFB3',
                pulseColor: '#00FFDD',
                description: 'Builds partnerships & manages key accounts',
                icon: '🤝',
                rotation: 300,
                orbitRadius: 200,
                orbitSpeed: 0.02
            },
            { 
                name: 'Sophie', 
                role: 'Social Media Manager',
                x: 0.2, 
                y: 0.15, 
                color: '#00FF88',
                pulseColor: '#00FFB3',
                description: 'Plans posts & automates engagement',
                icon: '📱',
                rotation: 330,
                orbitRadius: 200,
                orbitSpeed: 0.017
            },
            { 
                name: 'Liam', 
                role: 'Product Designer',
                x: 0.8, 
                y: 0.15, 
                color: '#00FFB3',
                pulseColor: '#00FFDD',
                description: 'Generates concepts & designs assets',
                icon: '🎨',
                rotation: 30,
                orbitRadius: 200,
                orbitSpeed: 0.023
            }
        ];
        
        let hoveredAgent = null;
        let particles = [];
        let connections = [];
        let animationTime = 0;
        let activityBursts = [];
        let activeConnections = new Set();
        
        // Create more sophisticated particles
        for (let i = 0; i < 150; i++) {
            particles.push({
                x: Math.random(),
                y: Math.random(),
                vx: (Math.random() - 0.5) * 0.001,
                vy: (Math.random() - 0.5) * 0.001,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.6 + 0.1,
                color: Math.random() > 0.5 ? '#00FF88' : '#00FFB3'
            });
        }
        
        // Create enhanced data flow connections
        // Agent to center connections
        agents.forEach((agent, i) => {
            connections.push({
                from: i,
                to: 'center',
                type: 'primary',
                particles: Array(3).fill(null).map((_, j) => ({
                    progress: j * 0.33,
                    speed: 0.003 + Math.random() * 0.002,
                    size: 2 + Math.random() * 2
                }))
            });
        });
        
        // Inter-agent connections for real-time collaboration
        const interAgentConnections = [
            { from: 0, to: 1, type: 'collaboration' }, // James to Alex
            { from: 1, to: 2, type: 'collaboration' }, // Alex to Maya
            { from: 0, to: 3, type: 'data' }, // James to Ian
            { from: 3, to: 2, type: 'data' }, // Ian to Maya
            { from: 2, to: 4, type: 'collaboration' }, // Maya to Tiffany
            { from: 3, to: 4, type: 'data' }, // Ian to Tiffany
            { from: 1, to: 4, type: 'collaboration' }, // Alex to Tiffany
            { from: 0, to: 2, type: 'data' }, // James to Maya
            { from: 3, to: 1, type: 'data' }, // Ian to Alex
            { from: 4, to: 0, type: 'feedback' }, // Tiffany to James
            { from: 4, to: 1, type: 'feedback' }, // Tiffany to Alex
            { from: 2, to: 3, type: 'analysis' }, // Maya to Ian
            { from: 1, to: 3, type: 'sync' }, // Alex to Ian
            { from: 0, to: 4, type: 'sync' }, // James to Tiffany
            { from: 5, to: 0, type: 'data' }, // Oscar to James
            { from: 5, to: 2, type: 'collaboration' }, // Oscar to Maya
            { from: 6, to: 1, type: 'collaboration' }, // Sophie to Alex
            { from: 6, to: 2, type: 'sync' }, // Sophie to Maya
            { from: 7, to: 0, type: 'sync' }, // Liam to James
            { from: 7, to: 3, type: 'data' }, // Liam to Ian
            { from: 7, to: 4, type: 'collaboration' }, // Liam to Tiffany
            { from: 1, to: 6, type: 'analysis' }, // Alex to Sophie
            { from: 3, to: 7, type: 'feedback' }, // Ian to Liam
        ];
        
        interAgentConnections.forEach(conn => {
            connections.push({
                from: conn.from,
                to: conn.to,
                type: conn.type,
                particles: Array(2).fill(null).map((_, j) => ({
                    progress: Math.random(),
                    speed: 0.002 + Math.random() * 0.003,
                    size: 1.5 + Math.random() * 1.5,
                    direction: Math.random() > 0.5 ? 1 : -1
                }))
            });
        });
        
        // Create agent HTML nodes
        function createAgentNodes() {
            agents.forEach((agent, i) => {
                const node = document.createElement('div');
                node.className = 'agent-node absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer';
                node.style.left = `${agent.x * 100}%`;
                node.style.top = `${agent.y * 100}%`;
                node.innerHTML = `
                    <div class="relative group">
                        <div class="absolute -inset-8 bg-gradient-to-r from-[${agent.color}] to-[${agent.pulseColor}] rounded-full opacity-0 group-hover:opacity-70 transition-all duration-500 blur-2xl animate-pulse"></div>
                        <div class="absolute -inset-6 bg-gradient-to-r from-[${agent.color}] to-transparent rounded-full opacity-30 group-hover:opacity-50 transition-all duration-300 blur-xl"></div>
                        <div class="relative bg-black/80 border-2 border-[${agent.color}] rounded-full p-1 backdrop-blur-xl group-hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_${agent.color}]">
                            <div class="absolute inset-0 bg-gradient-to-br from-[${agent.color}]/20 to-transparent rounded-full"></div>
                            <div class="relative z-10 w-20 h-20">
                                <img src="Web Images/${agent.name}.png" alt="${agent.name}" class="w-full h-full rounded-full object-cover animate-pulse" style="animation-delay: ${i * 0.1}s" onerror="this.style.display='none'">
                            </div>
                        </div>
                    </div>
                `;
                
                node.addEventListener('mouseenter', () => {
                    hoveredAgent = i;
                    agentInfo.querySelector('h4').textContent = `${agent.name} - ${agent.role}`;
                    agentInfo.querySelector('p').textContent = agent.description;
                    agentInfo.style.opacity = '1';
                });
                
                node.addEventListener('mouseleave', () => {
                    hoveredAgent = null;
                    agentInfo.style.opacity = '0';
                });
                
                agentNodesContainer.appendChild(node);
            });
        }
        
        createAgentNodes();
        
        function drawNetwork() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            animationTime += 0.01;
            
            // Create gradient background
            const bgGradient = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 0, canvas.width/2, canvas.height/2, canvas.width/2);
            bgGradient.addColorStop(0, 'rgba(0, 255, 136, 0.02)');
            bgGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Enhanced background particles
            particles.forEach((particle, i) => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                if (particle.x < 0 || particle.x > 1) particle.vx *= -1;
                if (particle.y < 0 || particle.y > 1) particle.vy *= -1;
                
                // Create particle trails
                const trail = 5;
                for(let t = 0; t < trail; t++) {
                    const alpha = particle.opacity * (1 - t/trail) * 0.5;
                    ctx.fillStyle = `rgba(0, 255, 136, ${alpha})`;
                    ctx.beginPath();
                    ctx.arc(
                        (particle.x - particle.vx * t * 10) * canvas.width, 
                        (particle.y - particle.vy * t * 10) * canvas.height, 
                        particle.size * (1 - t/trail), 
                        0, Math.PI * 2
                    );
                    ctx.fill();
                }
                
                // Connect nearby particles
                particles.slice(i + 1).forEach(other => {
                    const dx = particle.x - other.x;
                    const dy = particle.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 0.15 && distance > 0) {
                        const opacity = 0.3 * (1 - distance / 0.15);
                        ctx.strokeStyle = `rgba(0, 255, 136, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particle.x * canvas.width, particle.y * canvas.height);
                        ctx.lineTo(other.x * canvas.width, other.y * canvas.height);
                        ctx.stroke();
                    }
                });
            });
            
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            
            // Update agent positions for orbital movement
            agents.forEach((agent, i) => {
                agent.rotation += agent.orbitSpeed;
                const angle = (agent.rotation * Math.PI / 180);
                const radius = Math.min(canvas.width, canvas.height) * 0.35;
                agent.currentX = centerX + Math.cos(angle) * radius;
                agent.currentY = centerY + Math.sin(angle) * radius;
                
                // Update DOM node position
                const node = agentNodesContainer.children[i];
                if (node) {
                    node.style.left = `${agent.currentX}px`;
                    node.style.top = `${agent.currentY}px`;
                }
            });
            
            // Draw energy field around center
            for(let ring = 0; ring < 3; ring++) {
                const ringRadius = 120 + ring * 30 + Math.sin(animationTime * 2 + ring) * 10;
                ctx.strokeStyle = `rgba(0, 255, 136, ${0.2 - ring * 0.05})`;
                ctx.lineWidth = 2 - ring * 0.5;
                ctx.beginPath();
                ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
                ctx.stroke();
            }
            
            // Draw dynamic connections
            connections.forEach((connection, connIndex) => {
                const fromAgent = agents[connection.from];
                const fromX = fromAgent.currentX || fromAgent.x * canvas.width;
                const fromY = fromAgent.currentY || fromAgent.y * canvas.height;
                
                let toX, toY, connectionColor, lineStyle;
                
                if (connection.to === 'center') {
                    // Connection to company center
                    toX = centerX;
                    toY = centerY;
                    connectionColor = fromAgent.color;
                    lineStyle = 'solid';
                } else {
                    // Inter-agent connection
                    const toAgent = agents[connection.to];
                    toX = toAgent.currentX || toAgent.x * canvas.width;
                    toY = toAgent.currentY || toAgent.y * canvas.height;
                    
                    // Different colors for different connection types
                    if (connection.type === 'collaboration') {
                        connectionColor = '#00FFDD';
                        lineStyle = 'dashed';
                    } else if (connection.type === 'data') {
                        connectionColor = '#00FF88';
                        lineStyle = 'dotted';
                    } else if (connection.type === 'feedback') {
                        connectionColor = '#FFD700';
                        lineStyle = 'double';
                    } else if (connection.type === 'analysis') {
                        connectionColor = '#FF00FF';
                        lineStyle = 'wave';
                    } else if (connection.type === 'sync') {
                        connectionColor = '#00DDFF';
                        lineStyle = 'pulse';
                    }
                }
                
                // Draw connection line
                ctx.save();
                if (lineStyle === 'dashed') {
                    ctx.setLineDash([5, 5]);
                } else if (lineStyle === 'dotted') {
                    ctx.setLineDash([2, 3]);
                }
                
                const isHovered = hoveredAgent === connection.from || hoveredAgent === connection.to;
                ctx.strokeStyle = connectionColor;
                ctx.lineWidth = isHovered ? 2 : 1;
                ctx.globalAlpha = isHovered ? 0.8 : (connection.to === 'center' ? 0.4 : 0.3);
                
                // Create dynamic curve
                const curve = Math.sin(animationTime * 2 + connIndex) * 30;
                const midX = (fromX + toX) / 2 + curve;
                const midY = (fromY + toY) / 2 + curve;
                
                ctx.beginPath();
                ctx.moveTo(fromX, fromY);
                ctx.quadraticCurveTo(midX, midY, toX, toY);
                ctx.stroke();
                ctx.restore();
                
                // Enhanced data flow particles
                connection.particles.forEach((particle, pIndex) => {
                    // Update particle progress
                    if (particle.direction) {
                        particle.progress += particle.speed * particle.direction;
                        if (particle.progress > 1 || particle.progress < 0) {
                            particle.direction *= -1;
                        }
                    } else {
                        particle.progress += particle.speed;
                        if (particle.progress > 1) particle.progress = 0;
                    }
                    
                    // Calculate position along curve
                    const t = Math.max(0, Math.min(1, particle.progress));
                    const px = Math.pow(1-t, 2) * fromX + 2 * (1-t) * t * midX + Math.pow(t, 2) * toX;
                    const py = Math.pow(1-t, 2) * fromY + 2 * (1-t) * t * midY + Math.pow(t, 2) * toY;
                    
                    // Multi-layer glow effect
                    for(let layer = 3; layer > 0; layer--) {
                        const glowGradient = ctx.createRadialGradient(px, py, 0, px, py, particle.size * layer * 2);
                        glowGradient.addColorStop(0, connectionColor);
                        glowGradient.addColorStop(0.5, connectionColor);
                        glowGradient.addColorStop(1, 'transparent');
                        
                        ctx.fillStyle = glowGradient;
                        ctx.globalAlpha = 0.2 / layer;
                        ctx.beginPath();
                        ctx.arc(px, py, particle.size * layer * 2, 0, Math.PI * 2);
                        ctx.fill();
                    }
                    
                    // Core particle
                    ctx.globalAlpha = 1;
                    ctx.fillStyle = '#FFFFFF';
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = connectionColor;
                    ctx.beginPath();
                    ctx.arc(px, py, particle.size, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.shadowBlur = 0;
                });
            });
            
            // Draw activity bursts
            activityBursts.forEach((burst, index) => {
                burst.radius += burst.speed;
                burst.opacity -= 0.02;
                
                if (burst.opacity > 0) {
                    ctx.strokeStyle = `rgba(0, 255, 221, ${burst.opacity})`;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.arc(burst.x, burst.y, burst.radius, 0, Math.PI * 2);
                    ctx.stroke();
                    
                    // Inner ring
                    ctx.strokeStyle = `rgba(0, 255, 136, ${burst.opacity * 0.5})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.arc(burst.x, burst.y, burst.radius * 0.7, 0, Math.PI * 2);
                    ctx.stroke();
                } else {
                    activityBursts.splice(index, 1);
                }
            });
            
            // Create random activity bursts
            if (Math.random() < 0.02) {
                const randomAgent = agents[Math.floor(Math.random() * agents.length)];
                activityBursts.push({
                    x: randomAgent.currentX,
                    y: randomAgent.currentY,
                    radius: 10,
                    speed: 2,
                    opacity: 0.8
                });
                
                // Activate random connections
                const numConnections = Math.floor(Math.random() * 3) + 1;
                for (let i = 0; i < numConnections; i++) {
                    const connId = Math.floor(Math.random() * connections.length);
                    activeConnections.add(connId);
                    setTimeout(() => activeConnections.delete(connId), 2000 + Math.random() * 3000);
                }
            }
            
            // Draw active agent indicators
            agents.forEach((agent, i) => {
                if (activeConnections.has(i) || Math.random() < 0.001) {
                    const x = agent.currentX;
                    const y = agent.currentY;
                    
                    ctx.fillStyle = `rgba(0, 255, 136, ${0.5 + Math.sin(animationTime * 10) * 0.3})`;
                    ctx.beginPath();
                    ctx.arc(x, y, 45 + Math.sin(animationTime * 5) * 5, 0, Math.PI * 2);
                    ctx.fill();
                }
            });
            
            // Enhanced center hub effects
            const pulseScale = 1 + Math.sin(animationTime * 2) * 0.15;
            
            // Multiple layered glows
            for(let i = 3; i > 0; i--) {
                const hubGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 80 * pulseScale * i/3);
                hubGradient.addColorStop(0, `rgba(0, 255, 136, ${0.3/i})`);
                hubGradient.addColorStop(0.5, `rgba(0, 255, 179, ${0.2/i})`);
                hubGradient.addColorStop(1, 'transparent');
                
                ctx.fillStyle = hubGradient;
                ctx.beginPath();
                ctx.arc(centerX, centerY, 80 * pulseScale * i/3, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // Rotating energy lines from center
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(animationTime);
            for(let i = 0; i < 6; i++) {
                ctx.rotate(Math.PI / 3);
                const lineGradient = ctx.createLinearGradient(0, 0, 100, 0);
                lineGradient.addColorStop(0, 'rgba(0, 255, 136, 0.5)');
                lineGradient.addColorStop(1, 'transparent');
                ctx.strokeStyle = lineGradient;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(100, 0);
                ctx.stroke();
            }
            ctx.restore();
            
            requestAnimationFrame(drawNetwork);
        }
        
        drawNetwork();
        
        // Update network statistics
        function updateNetworkStats() {
            // Update active connections counter
            const activeConns = document.getElementById('activeConnections');
            if (activeConns) {
                const currentValue = parseInt(activeConns.textContent);
                const targetValue = 15 + activeConnections.size + Math.floor(Math.random() * 10);
                activeConns.textContent = Math.min(99, Math.max(15, currentValue + (targetValue > currentValue ? 1 : -1)));
            }
            
            // Update data flow
            const dataFlow = document.getElementById('dataFlow');
            if (dataFlow) {
                const currentValue = parseFloat(dataFlow.textContent);
                const newValue = (currentValue + Math.random() * 0.1).toFixed(1);
                dataFlow.textContent = newValue + 'TB';
            }
            
            // Update tasks synced
            const tasksSynced = document.getElementById('tasksSynced');
            if (tasksSynced) {
                const currentValue = parseInt(tasksSynced.textContent);
                tasksSynced.textContent = currentValue + Math.floor(Math.random() * 3);
            }
            
            // Update processing status
            const processingStatus = document.getElementById('processingStatus');
            if (processingStatus) {
                const statuses = [
                    'Processing...',
                    'Analyzing data...',
                    'Syncing agents...',
                    'Optimizing routes...',
                    'Learning patterns...',
                    'Distributing tasks...'
                ];
                processingStatus.textContent = statuses[Math.floor(Math.random() * statuses.length)];
            }
        }
        
        // Update activity feed
        function updateActivityFeed() {
            const activityFeed = document.getElementById('activity-feed');
            if (activityFeed && Math.random() < 0.3) {
                const activities = [
                    'James → Alex: Lead qualified',
                    'Ian → Maya: Data processed',
                    'Maya → Tiffany: Customer updated',
                    'Alex → James: Meeting booked',
                    'Tiffany → Ian: Report generated',
                    'James → Ian: New data source',
                    'Maya → Alex: Follow-up scheduled',
                    'Ian → Central Hub: Analysis complete',
                    'Central Hub → All: Task distributed',
                    'Alex → Maya: Lead transferred',
                    'Tiffany → James: Feedback received',
                    'Oscar → Maya: Partnership established',
                    'Sophie → Alex: Social posts scheduled',
                    'Liam → Ian: Design concepts delivered',
                    'Sophie → Oscar: Brand guidelines shared',
                    'Liam → Tiffany: Product mockups created',
                    'Oscar → Sophie: Account insights provided'
                ];
                
                const newActivity = document.createElement('div');
                newActivity.className = 'animate-pulse text-xs text-gray-400';
                newActivity.textContent = activities[Math.floor(Math.random() * activities.length)];
                
                activityFeed.insertBefore(newActivity, activityFeed.firstChild);
                
                // Keep only last 5 activities
                while (activityFeed.children.length > 5) {
                    activityFeed.removeChild(activityFeed.lastChild);
                }
            }
        }
        
        // Update stats and feed periodically
        setInterval(updateNetworkStats, 1000);
        setInterval(updateActivityFeed, 2000);

        // Contact form functionality
        function scrollToContactForm() {
            const contactForm = document.getElementById('contact-form');
            if (contactForm) {
                contactForm.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // Add highlight effect
                contactForm.style.boxShadow = '0 0 50px rgba(0, 255, 136, 0.5)';
                setTimeout(() => {
                    contactForm.style.boxShadow = '';
                }, 2000);
            }
        }

        function handleFormSubmit(event) {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Basic validation
            if (!data.fullName || !data.email) {
                alert('Please fill in all required fields.');
                return;
            }
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }

            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;

            // Send to n8n webhook
            fetch('https://autosolutions-ai-cloud.app.n8n.cloud/webhook/1dea1ecd-3a21-4750-b932-2b911b3a0921', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(res => {
                if (!res.ok) throw new Error('Webhook error');
                return res.json().catch(() => ({}));
            })
            .then(() => {
                const successMessage = document.createElement('div');
                successMessage.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4';
                successMessage.innerHTML = `
                    <p class="font-semibold">Thank you for your interest!</p>
                    <p>We'll be in touch within 24 hours to schedule your free consultation.</p>
                `;
                form.parentNode.insertBefore(successMessage, form);
                form.reset();
                submitButton.textContent = 'Message Sent!';
                submitButton.style.background = 'linear-gradient(to right, #10B981, #059669)';
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.style.background = '';
                    if (successMessage.parentNode) {
                        successMessage.parentNode.removeChild(successMessage);
                    }
                }, 3000);
            })
            .catch(() => {
                alert('There was a problem submitting the form. Please try again later.');
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
        }

        // Generate random session ID
        let sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);

        // Add to chat messages with proper styling
        function addMessage(sender, content, isUser = false) {
            const chatMessages = document.getElementById('chatMessages');
            if (!chatMessages) return;
            
            const messageDiv = document.createElement('div');
            messageDiv.style.cssText = `display: flex; margin-bottom: 10px; ${isUser ? 'justify-content: flex-end;' : ''}`;
            
            if (isUser) {
                messageDiv.innerHTML = `
                    <div style="background: #00FF88; color: black; padding: 10px; border-radius: 15px; max-width: 70%;">
                        ${content}
                    </div>
                `;
            } else {
                messageDiv.innerHTML = `
                    <img src="Web Images/Daniel.png" style="width: 32px; height: 32px; border-radius: 50%; margin-right: 8px;">
                    <div style="background: rgba(255,255,255,0.1); padding: 10px; border-radius: 15px; color: white; max-width: 70%;">
                        ${content}
                    </div>
                `;
            }
            
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // Ensure chat interface is hidden on load
        window.addEventListener('DOMContentLoaded', function() {
            const chatContainer = document.getElementById('chatContainer');
            if (chatContainer) chatContainer.style.display = 'none';
            const chatBubble = document.getElementById('chatBubble');
            if (chatBubble) chatBubble.style.display = 'flex';
        });

        window.toggleChat = function() {
            const chatInterface = document.getElementById('chatInterface');
            const chatBubble = document.getElementById('chatBubble');
            
            if (chatInterface) {
                // Toggle the HTML chat interface
                if (chatInterface.classList.contains('active')) {
                    chatInterface.classList.remove('active');
                    if (chatBubble) chatBubble.style.display = 'flex';
                } else {
                    chatInterface.classList.add('active');
                    if (chatBubble) chatBubble.style.display = 'none';
                    
                    // Focus on input when chat opens
                    const chatInput = document.getElementById('chatInput');
                    if (chatInput) {
                        setTimeout(() => chatInput.focus(), 100);
                    }
                }
            }
        }

        window.closeChat = function() {
            const chatInterface = document.getElementById('chatInterface');
            const chatBubble = document.getElementById('chatBubble');
            if (chatInterface) chatInterface.classList.remove('active');
            if (chatBubble) chatBubble.style.display = 'flex';
        }

        // Remove duplicate function since we're using sendMessage for everything

        // Handle Enter key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' && document.getElementById('chatInput') === document.activeElement) {
                event.preventDefault();
                sendMessage();
            }
        });

                 // Function for HTML chat interface send button
         window.sendMessage = function() {
             const input = document.getElementById('chatInput');
             const message = input.value.trim();
             
             if (!message) return;
             
             // Add user message to HTML chat interface
             addHTMLMessage('user', message);
             input.value = '';
             
             // Show typing indicator
             const typingIndicator = document.getElementById('typingIndicator');
             if (typingIndicator) typingIndicator.style.display = 'block';
             
             // Set up timeout for 30 seconds
             const timeoutId = setTimeout(() => {
                 if (typingIndicator) typingIndicator.style.display = 'none';
                 addHTMLMessage('bot', 'I apologize, but I\'m experiencing some technical difficulties right now. Please try again in a moment or contact our support team.');
             }, 30000);
             
             // Send to webhook
             fetch('https://autosolutions-ai-cloud.app.n8n.cloud/webhook/4fccff12-dcf2-4b31-8b80-0f87611e521f', {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify({ message: message, sessionId: sessionId })
             })
             .then(res => {
                 // Clear timeout since we got a response
                 clearTimeout(timeoutId);
                 
                 // Check if response is okay
                 if (!res.ok) {
                     throw new Error(`HTTP error! status: ${res.status}`);
                 }
                 
                 // Try to parse as JSON, but handle text responses too
                 const contentType = res.headers.get('content-type');
                 if (contentType && contentType.includes('application/json')) {
                     return res.json();
                 } else {
                     return res.text().then(text => ({ message: text }));
                 }
             })
             .then(data => {
                 // Hide typing indicator
                 if (typingIndicator) typingIndicator.style.display = 'none';
                 
                 // Extract the actual response message
                 let reply;
                 if (typeof data === 'string') {
                     reply = data;
                 } else if (data.reply) {
                     reply = data.reply;
                 } else if (data.response) {
                     reply = data.response;
                 } else if (data.message) {
                     reply = data.message;
                 } else if (data.output) {
                     reply = data.output;
                 } else {
                     // If we get "Workflow started" or similar, show a generic message
                     if (JSON.stringify(data).toLowerCase().includes('workflow started')) {
                         reply = 'Thanks for your message! I\'m processing your request and will respond shortly.';
                     } else {
                         reply = 'Thanks for your message! I\'ll help you learn more about My Virtual Employee.';
                     }
                 }
                 
                 addHTMLMessage('bot', reply);
             })
             .catch(error => {
                 // Clear timeout on error
                 clearTimeout(timeoutId);
                 console.error('Error:', error);
                 if (typingIndicator) typingIndicator.style.display = 'none';
                 addHTMLMessage('bot', 'I apologize, but I\'m having trouble connecting right now. Please try again in a moment.');
             });
         };

        // Function to add messages to HTML chat interface
        function addHTMLMessage(sender, content) {
            const chatMessages = document.getElementById('chatMessages');
            if (!chatMessages) return;
            
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message ${sender}`;
            
            if (sender === 'user') {
                messageDiv.innerHTML = `
                    <div class="chat-message-content">${content}</div>
                `;
            } else {
                messageDiv.innerHTML = `
                    <div class="chat-message-avatar">
                        <img src="Web Images/Daniel.png" alt="Daniel">
                    </div>
                    <div class="chat-message-content">${content}</div>
                `;
            }
            
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        window.handleKeyPress = function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                sendMessage();
            }
        };
